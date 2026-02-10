"use client"

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { X } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  ASCII logos                                                        */
/* ------------------------------------------------------------------ */

const ASCII_LOGOS: Record<string, string[]> = {
  arch: [
    "                   -`                 ",
    "                  .o+`                ",
    "                 `ooo/                ",
    "                `+oooo:               ",
    "               `+oooooo:              ",
    "               -+oooooo+:             ",
    "             `/:-:++oooo+:            ",
    "            `/++++/+++++++:           ",
    "           `/++++++++++++++:          ",
    "          `/+++ooooooooooooo/`        ",
    "         ./ooosssso++osssssso+`       ",
    "        .oossssso-````/ossssss+`      ",
    "       -osssssso.      :ssssssso.     ",
    "      :osssssss/        osssso+++.    ",
    "     /ossssssss/        +ssssooo/-    ",
    "   `/ossssso+/:-        -:/+osssso+-  ",
    "  `+sso+:-`                 `.-/+oso: ",
    " `++:.                           `-/+/",
    " .`                                 `/ ",
  ],
  debian: [
    "       _,met$$$$$gg.          ",
    "    ,g$$$$$$$$$$$$$$$P.       ",
    "  ,g$$P\"     \"\"\"Y$$.\".        ",
    " ,$$P'              `$$$.     ",
    "',$$P       ,ggs.     `$$b:  ",
    "`d$$'     ,$P\"'   .    $$$   ",
    " $$P      d$'     ,    $$P   ",
    " $$:      $$.   -    ,d$$'   ",
    " $$;      Y$b._   _,d$P'    ",
    " Y$$.    `.`\"Y$$$$P\"'        ",
    " `$$b      \"-.__              ",
    "  `Y$$                        ",
    "   `Y$$.                      ",
    "     `$$b.                    ",
    "       `Y$$b.                 ",
    "          `\"Y$b._             ",
    "              `\"\"\"\"           ",
  ],
  ubuntu: [
    "             .-/+oossssoo+/-.           ",
    "         `:+ssssssssssssssssss+:`       ",
    "       -+ssssssssssssssssssyyssss+-     ",
    "     .ossssssssssssssssss  dMMMNy sso.  ",
    "   /sssssssssss hdmmNNmmyNMMMMh  ssss\\  ",
    "  +sssssssss hm yd MMMMMMMMMMMNdd ysss+ ",
    " /ssssssss hNMMM yNMMMMMMMMMMmmdd yssss\\",
    ".ssssssss dMMMNh  NMMMMhssssoss shmmssss.",
    "+ssss hNMMM yh NMMM  ssssssssss mNhssss+",
    "ossyNMMMNy    NMMMo  ssssssssss NMmosso",
    "ossyNMMMNy    NMMMo  ssssssssss NMmosso",
    "+ssss hNMMM yh NMMM  ssssssssss mNhssss+",
    ".ssssssss dMMMNh  NMMMMhssssoss shmmssss.",
    " \\ssssssss hNMMM yNMMMMMMMMMMmmdd yssss/",
    "  +sssssssss hm yd MMMMMMMMMMMNdd ysss+ ",
    "   \\sssssssssss hdmmNNmmyNMMMMh  ssss/  ",
    "     .ossssssssssssssssss  dMMMNy sso.  ",
    "       -+sssssssssssssssssyyyssss+-     ",
    "         `:+ssssssssssssssssss+:`       ",
    "             .-/+oossssoo+/-.           ",
  ],
  fedora: [
    "             .',;::::;,'.             ",
    "         .';:cccccccccccc:;,.         ",
    "      .;cccccccccccccccccccccc;.      ",
    "    .:cccccccccccccccccccccccccc:.    ",
    "  .;ccccccccccccc;.:dddl:.;ccccccc;. ",
    " .:ccccccccccccc;OWMKOOXMWd;ccccccc:.",
    ".:ccccccccccccc;KMMc;cc;xMMc;ccccccc:.",
    ",cccccccccccccc;MMM.;cc;;MM:;cccccccc,",
    ":cccccccccccccc;MMM.;cc;;MM:;cccccccc:",
    ":ccccccc;oxOOOo;MMM0OOk.mMd;ccccccc: ",
    "cccccc;0telerik.telerik.;ccccccc;     ",
    ":ccccc;dMNc..telerik.;cccccc:;        ",
    ":cccccc;dMNc..telerik.;cccc:;         ",
    ",cccccc;0telerik.:ccc:;               ",
    ":ccccccc;oxOOOo;MMMMMM;:ccc:;        ",
    " .:ccccccccccccc;MMM;ccc;cccc:;       ",
    "  .:ccccccccccccc;MMM.;cc;cccc;:.     ",
    "    .:cccccccccccc;MNd;cccccccc;.     ",
    "      .;cccccccccccccccccccc;.        ",
    "             .googl                   ",
  ],
  gentoo: [
    "         -/oyddmdhs+:.                ",
    "     -odNMMMMMMMMNNmhy+-`             ",
    "   -yNMMMMMMMMMMMNNNmmdhy+-           ",
    " `omMMMMMMMMMMMMNmdmmmmddhhy/`        ",
    " omMMMMMMMMMMMNhhyyyohmdddhhhdo`      ",
    ".ydMMMMMMMMMMdoooyhshmdc  ``:```      ",
    " ydMMMMMMMMMd  ooo`` hy  `````        ",
    " .FMMMMMMMMM-  oyhy:`  `         +    ",
    "  :NMMMMMMMM-      -oh:        ohy    ",
    "   oNMMMMMMMMo          `:ohmMMMMMd   ",
    "    yMMMMMMMMMs       -oyhdmMMMMMMd   ",
    "     -dMMMMMMMMM+     `+mMMMMMMMMo    ",
    "      -dMMMMMMMMN:       .mMMMMMo     ",
    "       `sNMMMMMMMNo:      `yMMMo      ",
    "         :hMMMMMMMNs-      .NMo       ",
    "            -/oyyhhyo/`    .dM:       ",
    "                          :yy:        ",
  ],
}

/* ------------------------------------------------------------------ */
/*  Virtual filesystem                                                 */
/* ------------------------------------------------------------------ */

interface FSNode {
  type: "file" | "dir"
  content?: string
  children?: Record<string, FSNode>
}

function createFS(): Record<string, FSNode> {
  return {
    home: {
      type: "dir",
      children: {
        "9data": {
          type: "dir",
          children: {
            ".bashrc": {
              type: "file",
              content:
                '# ~/.bashrc\nexport PS1="\\u@9data:\\w$ "\nexport EDITOR=vim\nalias ll="ls -la"\nalias cls="clear"\n\n# 9Data environment\nexport NODE_ENV=production\nexport DATA_CENTER=US-EAST-1',
            },
            ".ssh": {
              type: "dir",
              children: {
                authorized_keys: {
                  type: "file",
                  content:
                    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIN9... admin@9data.us\nssh-rsa AAAAB3NzaC1yc2EAAAA... deploy@relay-01",
                },
                config: {
                  type: "file",
                  content:
                    "Host relay-*\n  User 9data\n  IdentityFile ~/.ssh/id_ed25519\n  StrictHostKeyChecking no\n\nHost main-server\n  HostName 10.0.1.1\n  User root\n  Port 2222",
                },
              },
            },
            documents: {
              type: "dir",
              children: {
                "welcome.txt": {
                  type: "file",
                  content:
                    "=================================\n  Welcome to 9Data.US SSH Demo\n=================================\n\nThis is a simulated SSH session.\nYou can explore the filesystem,\nrun commands, and see how our\ninfrastructure operates.\n\nType 'help' for available commands.",
                },
                "network-map.txt": {
                  type: "file",
                  content:
                    "9Data.US Network Topology\n========================\n\n[CLIENT] ---> [RELAY-01] ---> [MAIN-SERVER]\n                  |                  |\n              [RELAY-02] -----> [BACKUP-01]\n                  |                  |\n              [RELAY-03] -----> [BACKUP-02]\n\nAll connections encrypted via WireGuard\nLatency: <2ms between nodes",
                },
                "sla.txt": {
                  type: "file",
                  content:
                    "Service Level Agreement\n======================\nUptime Guarantee: 99.99%\nDDoS Mitigation: <10s response\nSupport Response: <1hr\nData Redundancy: 3x replication\nBackup Frequency: Every 6 hours\nEncryption: AES-256 at rest, TLS 1.3 in transit",
                },
              },
            },
            scripts: {
              type: "dir",
              children: {
                "health-check.sh": {
                  type: "file",
                  content:
                    '#!/bin/bash\n# 9Data Health Check Script\necho "Running health check..."\necho "CPU: OK (12% usage)"\necho "RAM: OK (4.2GB / 32GB)"\necho "Disk: OK (234GB / 2TB)"\necho "Network: OK (1.2Gbps)"\necho "Services: All 14 running"\necho "---"\necho "Health check passed."',
                },
                "deploy.sh": {
                  type: "file",
                  content:
                    '#!/bin/bash\n# Deployment script\nset -e\n\necho "Pulling latest from main..."\necho "Building containers..."\necho "Running migrations..."\necho "Restarting services..."\necho "Deployment complete."',
                },
                "backup.sh": {
                  type: "file",
                  content:
                    '#!/bin/bash\n# Automated backup script\nDATE=$(date +%Y%m%d_%H%M%S)\nBACKUP_DIR="/mnt/backups/$DATE"\n\necho "Creating backup: $BACKUP_DIR"\necho "Dumping databases..."\necho "Compressing files..."\necho "Encrypting archive..."\necho "Uploading to offsite storage..."\necho "Backup complete: 2.4GB"',
                },
              },
            },
            logs: {
              type: "dir",
              children: {
                "access.log": {
                  type: "file",
                  content:
                    "[2026-02-10 08:12:34] CONNECT relay-01 -> main-server OK\n[2026-02-10 08:12:35] DATA_RECV 1.2GB from client-vaultmc\n[2026-02-10 08:13:01] PROCESS batch-4421 started\n[2026-02-10 08:14:22] PROCESS batch-4421 complete (81s)\n[2026-02-10 08:14:23] DATA_SEND 0.8GB to client-vaultmc\n[2026-02-10 08:15:00] HEALTH_CHECK all nodes OK\n[2026-02-10 08:20:00] BACKUP incremental started\n[2026-02-10 08:22:14] BACKUP incremental complete",
                },
                "error.log": {
                  type: "file",
                  content:
                    "[2026-02-09 23:44:01] WARN: High latency to relay-03 (45ms)\n[2026-02-09 23:44:02] INFO: Rerouting through relay-02\n[2026-02-09 23:44:02] INFO: Latency normalized (2ms)",
                },
                "firewall.log": {
                  type: "file",
                  content:
                    "[2026-02-10 03:21:11] BLOCKED: SYN flood from 192.168.x.x (2.1Gbps)\n[2026-02-10 03:21:12] MITIGATION: Activated DDoS scrubbing\n[2026-02-10 03:21:15] BLOCKED: Traffic normalized\n[2026-02-10 06:45:33] BLOCKED: Port scan from 10.x.x.x\n[2026-02-10 06:45:33] ACTION: IP blacklisted for 24h",
                },
              },
            },
          },
        },
      },
    },
    etc: {
      type: "dir",
      children: {
        hostname: { type: "file", content: "9data-main" },
        "os-release": {
          type: "file",
          content:
            'NAME="Arch Linux"\nPRETTY_NAME="Arch Linux"\nID=arch\nBUILD_ID=rolling\nANSI_COLOR="38;2;23;147;209"',
        },
        "resolv.conf": {
          type: "file",
          content:
            "# Generated by 9Data\nnameserver 1.1.1.1\nnameserver 8.8.8.8\nsearch 9data.internal",
        },
      },
    },
    var: {
      type: "dir",
      children: {
        log: {
          type: "dir",
          children: {
            "syslog": {
              type: "file",
              content:
                "Feb 10 08:00:01 9data-main systemd[1]: Started 9Data Core Service.\nFeb 10 08:00:02 9data-main kernel: [ 0.000000] Linux version 6.7.4-arch1-1\nFeb 10 08:00:03 9data-main wireguard: wg0: Peer connected from relay-01",
            },
          },
        },
        www: {
          type: "dir",
          children: {
            "index.html": {
              type: "file",
              content:
                '<!DOCTYPE html>\n<html>\n<head><title>9Data.US</title></head>\n<body>\n  <h1>9Data.US - Private Infrastructure</h1>\n  <p>This server is not publicly accessible.</p>\n</body>\n</html>',
            },
          },
        },
      },
    },
    tmp: { type: "dir", children: {} },
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function resolvePath(
  fs: Record<string, FSNode>,
  cwd: string,
  target: string
): { node: FSNode | null; absPath: string } {
  let parts: string[]
  if (target.startsWith("/")) {
    parts = target.split("/").filter(Boolean)
  } else {
    parts = [...cwd.split("/").filter(Boolean), ...target.split("/").filter(Boolean)]
  }

  // resolve . and ..
  const resolved: string[] = []
  for (const p of parts) {
    if (p === ".") continue
    if (p === "..") {
      resolved.pop()
      continue
    }
    resolved.push(p)
  }

  let current: Record<string, FSNode> | undefined = fs
  for (let i = 0; i < resolved.length; i++) {
    const seg = resolved[i]
    if (!current || !current[seg]) return { node: null, absPath: "/" + resolved.join("/") }
    const n = current[seg]
    if (i === resolved.length - 1) return { node: n, absPath: "/" + resolved.join("/") }
    if (n.type === "dir") {
      current = n.children
    } else {
      return { node: null, absPath: "/" + resolved.join("/") }
    }
  }

  // root
  return {
    node: { type: "dir", children: fs },
    absPath: "/" + resolved.join("/"),
  }
}

function listDir(node: FSNode): string[] {
  if (node.type !== "dir" || !node.children) return []
  return Object.keys(node.children).sort()
}

/* ------------------------------------------------------------------ */
/*  Command processor                                                  */
/* ------------------------------------------------------------------ */

interface TermState {
  fs: Record<string, FSNode>
  cwd: string
  history: string[]
  distro: string
}

function processCmd(
  input: string,
  state: TermState
): { output: string[]; newCwd?: string; newDistro?: string } {
  const trimmed = input.trim()
  if (!trimmed) return { output: [] }

  const parts = trimmed.split(/\s+/)
  const cmd = parts[0]
  const args = parts.slice(1)

  switch (cmd) {
    case "help":
      return {
        output: [
          "Available commands:",
          "  ls [path]        - List directory contents",
          "  cd [path]        - Change directory",
          "  cat <file>       - Display file contents",
          "  pwd              - Print working directory",
          "  whoami           - Display current user",
          "  uname [-a]       - System information",
          "  uptime           - System uptime",
          "  df [-h]          - Disk usage",
          "  free [-h]        - Memory usage",
          "  top              - Process snapshot",
          "  ps aux           - Process list",
          "  fastfetch        - System info with ASCII art",
          "  neofetch         - Alias for fastfetch",
          "  setdistro <name> - Change ASCII logo (arch/debian/ubuntu/fedora/gentoo)",
          "  ping <host>      - Simulate ping",
          "  tree [path]      - Directory tree",
          "  echo <text>      - Print text",
          "  date             - Current date/time",
          "  hostname         - Display hostname",
          "  clear            - Clear terminal",
          "  exit             - Close terminal",
          "",
          "Tab through your command history with Arrow Up/Down.",
        ],
      }

    case "ls": {
      const target = args[0] || "."
      const showAll = args.includes("-a") || args.includes("-la") || args.includes("-al")
      const pathTarget = args.find((a) => !a.startsWith("-")) || "."
      const { node } = resolvePath(state.fs, state.cwd, pathTarget)
      if (!node) return { output: [`ls: cannot access '${pathTarget}': No such file or directory`] }
      if (node.type === "file") return { output: [pathTarget] }
      const items = listDir(node)
      const display = showAll ? [".  ..", ...items] : items
      if (display.length === 0) return { output: ["(empty)"] }
      return {
        output: display.map((name) => {
          const child = node.children?.[name]
          if (name === "." || name === "..") return `drwxr-xr-x  ${name}/`
          if (!child) return name
          return child.type === "dir"
            ? `drwxr-xr-x  ${name}/`
            : `-rw-r--r--  ${name}`
        }),
      }
    }

    case "cd": {
      const target = args[0] || "/home/9data"
      if (target === "~") return { newCwd: "/home/9data", output: [] }
      const { node, absPath } = resolvePath(state.fs, state.cwd, target)
      if (!node) return { output: [`cd: no such file or directory: ${target}`] }
      if (node.type !== "dir") return { output: [`cd: not a directory: ${target}`] }
      return { output: [], newCwd: absPath || "/" }
    }

    case "cat": {
      if (!args[0]) return { output: ["cat: missing operand"] }
      const { node } = resolvePath(state.fs, state.cwd, args[0])
      if (!node) return { output: [`cat: ${args[0]}: No such file or directory`] }
      if (node.type === "dir") return { output: [`cat: ${args[0]}: Is a directory`] }
      return { output: (node.content || "").split("\n") }
    }

    case "pwd":
      return { output: [state.cwd] }

    case "whoami":
      return { output: ["9data"] }

    case "hostname":
      return { output: ["9data-main"] }

    case "date":
      return { output: [new Date().toString()] }

    case "echo":
      return { output: [args.join(" ")] }

    case "uname": {
      if (args.includes("-a"))
        return {
          output: [
            "Linux 9data-main 6.7.4-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
          ],
        }
      return { output: ["Linux"] }
    }

    case "uptime":
      return {
        output: [
          " 08:25:14 up 142 days, 3:41,  2 users,  load average: 0.12, 0.08, 0.06",
        ],
      }

    case "df": {
      return {
        output: [
          "Filesystem      Size  Used Avail Use% Mounted on",
          "/dev/nvme0n1p2  2.0T  234G  1.7T  13% /",
          "/dev/nvme0n1p1  512M   64M  448M  13% /boot",
          "/dev/sda1       8.0T  2.1T  5.9T  27% /mnt/data",
          "/dev/sdb1       8.0T  1.8T  6.2T  23% /mnt/backups",
          "tmpfs            16G  1.2M   16G   1% /tmp",
        ],
      }
    }

    case "free": {
      return {
        output: [
          "               total        used        free      shared  buff/cache   available",
          "Mem:            32Gi       4.2Gi        18Gi       312Mi       9.8Gi        27Gi",
          "Swap:           8.0Gi         0B       8.0Gi",
        ],
      }
    }

    case "top":
    case "htop": {
      return {
        output: [
          "top - 08:25:14 up 142 days,  2 users,  load average: 0.12, 0.08, 0.06",
          "Tasks: 142 total,   1 running, 141 sleeping,   0 stopped,   0 zombie",
          "%Cpu(s):  2.3 us,  0.8 sy,  0.0 ni, 96.4 id,  0.3 wa,  0.0 hi,  0.2 si",
          "MiB Mem :  32768.0 total,  18534.2 free,   4301.8 used,   9932.0 buff",
          "",
          "    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     COMMAND",
          "   1204 9data     20   0  842344 124520  42880 S   1.2   0.4     9data-core",
          "   1205 9data     20   0  524288  89120  31440 S   0.8   0.3     relay-proxy",
          "   1312 9data     20   0  412564  62340  22100 S   0.4   0.2     wireguard",
          "   1401 root      20   0  321456  45200  18800 S   0.2   0.1     nginx",
          "   1502 9data     20   0  256128  38400  14200 S   0.1   0.1     data-pipeline",
          "   1644 root      20   0  184320  28800  12400 S   0.1   0.1     sshd",
          "   1780 9data     20   0  142560  22100   9800 S   0.0   0.1     backup-daemon",
          "   1893 root      20   0   98304  15600   7200 S   0.0   0.0     crond",
        ],
      }
    }

    case "ps": {
      return {
        output: [
          "USER       PID %CPU %MEM    VSZ   RSS COMMAND",
          "root         1  0.0  0.0 169344 12800 /sbin/init",
          "root       412  0.0  0.0  98304  8400 /usr/lib/systemd/systemd-journald",
          "9data     1204  1.2  0.4 842344 124520 /opt/9data/bin/9data-core",
          "9data     1205  0.8  0.3 524288  89120 /opt/9data/bin/relay-proxy",
          "9data     1312  0.4  0.2 412564  62340 /usr/bin/wireguard",
          "root      1401  0.2  0.1 321456  45200 /usr/sbin/nginx",
          "9data     1502  0.1  0.1 256128  38400 /opt/9data/bin/data-pipeline",
          "root      1644  0.1  0.1 184320  28800 /usr/sbin/sshd",
          "9data     1780  0.0  0.1 142560  22100 /opt/9data/bin/backup-daemon",
          "9data     2041  0.0  0.0  12288   3200 -bash",
        ],
      }
    }

    case "ping": {
      const host = args[0]
      if (!host) return { output: ["ping: missing host operand"] }
      return {
        output: [
          `PING ${host} (10.0.1.${Math.floor(Math.random() * 254 + 1)}) 56(84) bytes of data.`,
          `64 bytes from ${host}: icmp_seq=1 ttl=64 time=1.${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ms`,
          `64 bytes from ${host}: icmp_seq=2 ttl=64 time=1.${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ms`,
          `64 bytes from ${host}: icmp_seq=3 ttl=64 time=1.${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ms`,
          "",
          `--- ${host} ping statistics ---`,
          "3 packets transmitted, 3 received, 0% packet loss, time 2003ms",
          "rtt min/avg/max/mdev = 1.12/1.34/1.56/0.18 ms",
        ],
      }
    }

    case "tree": {
      const target = args[0] || "."
      const { node, absPath } = resolvePath(state.fs, state.cwd, target)
      if (!node || node.type !== "dir")
        return { output: [`tree: '${target}' is not a directory`] }
      const lines: string[] = [absPath || "."]
      function walk(n: FSNode, prefix: string) {
        if (n.type !== "dir" || !n.children) return
        const entries = Object.keys(n.children).sort()
        entries.forEach((name, i) => {
          const isLast = i === entries.length - 1
          const connector = isLast ? "`-- " : "|-- "
          const child = n.children![name]
          lines.push(
            prefix +
              connector +
              name +
              (child.type === "dir" ? "/" : "")
          )
          if (child.type === "dir") {
            walk(child, prefix + (isLast ? "    " : "|   "))
          }
        })
      }
      walk(node, "")
      return { output: lines }
    }

    case "mkdir": {
      if (!args[0]) return { output: ["mkdir: missing operand"] }
      const parentPath = state.cwd
      const { node } = resolvePath(state.fs, parentPath, ".")
      if (node?.type === "dir" && node.children) {
        const dirName = args[0].replace(/\//g, "")
        if (node.children[dirName]) {
          return { output: [`mkdir: cannot create directory '${dirName}': File exists`] }
        }
        node.children[dirName] = { type: "dir", children: {} }
        return { output: [] }
      }
      return { output: ["mkdir: failed"] }
    }

    case "touch": {
      if (!args[0]) return { output: ["touch: missing operand"] }
      const { node } = resolvePath(state.fs, state.cwd, ".")
      if (node?.type === "dir" && node.children) {
        const fileName = args[0].replace(/\//g, "")
        if (!node.children[fileName]) {
          node.children[fileName] = { type: "file", content: "" }
        }
        return { output: [] }
      }
      return { output: ["touch: failed"] }
    }

    case "rm": {
      if (!args[0]) return { output: ["rm: missing operand"] }
      const target = args.find((a) => !a.startsWith("-")) || ""
      const { node } = resolvePath(state.fs, state.cwd, ".")
      if (node?.type === "dir" && node.children && node.children[target]) {
        const toRemove = node.children[target]
        if (toRemove.type === "dir" && !args.includes("-r") && !args.includes("-rf")) {
          return { output: [`rm: cannot remove '${target}': Is a directory`] }
        }
        delete node.children[target]
        return { output: [] }
      }
      return { output: [`rm: cannot remove '${target}': No such file or directory`] }
    }

    case "setdistro": {
      const distro = (args[0] || "").toLowerCase()
      if (!ASCII_LOGOS[distro]) {
        return {
          output: [
            `Unknown distro: '${distro}'`,
            `Available: ${Object.keys(ASCII_LOGOS).join(", ")}`,
          ],
        }
      }
      return { output: [`Distro set to ${distro}.`], newDistro: distro }
    }

    case "neofetch":
    case "fastfetch": {
      const logo = ASCII_LOGOS[state.distro] || ASCII_LOGOS.arch
      const info = [
        `9data@9data-main`,
        `------------------`,
        `OS: ${state.distro.charAt(0).toUpperCase() + state.distro.slice(1)} Linux x86_64`,
        `Host: 9Data Bare Metal Server`,
        `Kernel: 6.7.4-arch1-1`,
        `Uptime: 142 days, 3 hours, 41 mins`,
        `Packages: 847 (pacman)`,
        `Shell: bash 5.2.26`,
        `Terminal: 9data-ssh`,
        `CPU: AMD EPYC 7763 (128) @ 3.529GHz`,
        `GPU: N/A (headless)`,
        `Memory: 4301MiB / 32768MiB`,
        `Disk: 234G / 2.0T (13%)`,
        `Network: 10Gbps bonded`,
        `Locale: en_US.UTF-8`,
      ]
      const maxLogoLen = Math.max(...logo.map((l) => l.length))
      const lines: string[] = []
      const maxLen = Math.max(logo.length, info.length)
      for (let i = 0; i < maxLen; i++) {
        const l = (logo[i] || "").padEnd(maxLogoLen + 4)
        const r = info[i] || ""
        lines.push(l + r)
      }
      return { output: lines }
    }

    case "clear":
      return { output: ["__CLEAR__"] }

    case "exit":
      return { output: ["__EXIT__"] }

    default:
      return {
        output: [`-bash: ${cmd}: command not found. Type 'help' for available commands.`],
      }
  }
}

/* ------------------------------------------------------------------ */
/*  Terminal component                                                 */
/* ------------------------------------------------------------------ */

interface TermLine {
  type: "input" | "output"
  text: string
  prompt?: string
}

export function SSHDemo({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [lines, setLines] = useState<TermLine[]>([])
  const [input, setInput] = useState("")
  const [cwd, setCwd] = useState("/home/9data")
  const [fs] = useState(createFS)
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [distro, setDistro] = useState("arch")
  const [booting, setBooting] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const prompt = `9data@9data-main:${cwd === "/home/9data" ? "~" : cwd}$ `

  // Boot sequence
  useEffect(() => {
    if (!isOpen) return
    setBooting(true)
    setLines([])
    setCwd("/home/9data")
    setInput("")
    setCmdHistory([])
    setHistoryIdx(-1)
    setDistro("arch")

    const bootLines = [
      "Connecting to 9data-main...",
      "SSH-2.0-OpenSSH_9.6",
      "Authenticating with public key...",
      "Authentication successful.",
      "",
      "Last login: Mon Feb 10 08:12:34 2026 from 10.0.0.1",
      "",
      "  Welcome to 9Data.US Infrastructure",
      "  -----------------------------------",
      "  Arch Linux 6.7.4-arch1-1 | 128 cores | 32GB RAM",
      "  Type 'help' for available commands.",
      "",
    ]

    let i = 0
    const addLine = () => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, { type: "output", text: bootLines[i] }])
        i++
        setTimeout(addLine, 40 + Math.random() * 30)
      } else {
        setBooting(false)
      }
    }
    const t = setTimeout(addLine, 300)
    return () => clearTimeout(t)
  }, [isOpen])

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines, booting])

  // Focus input
  useEffect(() => {
    if (isOpen && !booting) {
      inputRef.current?.focus()
    }
  }, [isOpen, booting])

  const handleSubmit = useCallback(() => {
    if (booting) return
    const val = input
    setInput("")

    // Add to history
    if (val.trim()) {
      setCmdHistory((prev) => [val, ...prev])
    }
    setHistoryIdx(-1)

    // Add input line
    setLines((prev) => [...prev, { type: "input", text: val, prompt }])

    const result = processCmd(val, {
      fs,
      cwd,
      history: cmdHistory,
      distro,
    })

    if (result.output[0] === "__CLEAR__") {
      setLines([])
      return
    }
    if (result.output[0] === "__EXIT__") {
      setLines((prev) => [
        ...prev,
        { type: "output", text: "Connection to 9data-main closed." },
      ])
      setTimeout(() => onClose(), 800)
      return
    }

    if (result.newCwd) setCwd(result.newCwd)
    if (result.newDistro) setDistro(result.newDistro)

    setLines((prev) => [
      ...prev,
      ...result.output.map((text) => ({ type: "output" as const, text })),
    ])
  }, [input, booting, fs, cwd, cmdHistory, distro, prompt, onClose])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleSubmit()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (cmdHistory.length > 0) {
          const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1)
          setHistoryIdx(newIdx)
          setInput(cmdHistory[newIdx])
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (historyIdx > 0) {
          const newIdx = historyIdx - 1
          setHistoryIdx(newIdx)
          setInput(cmdHistory[newIdx])
        } else {
          setHistoryIdx(-1)
          setInput("")
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault()
        setLines([])
      }
    },
    [handleSubmit, cmdHistory, historyIdx]
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        style={{ animation: "fade-in 0.2s ease-out" }}
        onClick={onClose}
      />

      {/* Terminal window */}
      <div
        className="relative z-10 flex flex-col w-full max-w-3xl h-[80vh] max-h-[600px] rounded-lg border border-border overflow-hidden shadow-2xl"
        style={{ animation: "terminal-in 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                aria-label="Close terminal"
              />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-3 font-mono text-[11px] text-muted-foreground">
              9data@9data-main ~ ssh
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-[#0a0a0a] dark:bg-[#0a0a0a] p-4 font-mono text-[12px] leading-5 text-green-400"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-all">
              {line.type === "input" ? (
                <>
                  <span className="text-cyan-400">{line.prompt}</span>
                  <span className="text-foreground dark:text-green-100">{line.text}</span>
                </>
              ) : (
                <span className="text-green-400/90">{line.text}</span>
              )}
            </div>
          ))}

          {/* Active input line */}
          {!booting && (
            <div className="flex items-center whitespace-pre">
              <span className="text-cyan-400 shrink-0">{prompt}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-green-100 outline-none caret-green-400 font-mono text-[12px] leading-5"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
            </div>
          )}

          {/* Boot cursor */}
          {booting && (
            <span className="text-green-400 animate-blink">_</span>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes terminal-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
