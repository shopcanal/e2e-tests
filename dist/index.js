(() => {
  'use strict';
  var e = {
    351: function (e, t, i) {
      var r =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, r) {
              if (r === undefined) r = i;
              Object.defineProperty(e, r, {
                enumerable: true,
                get: function () {
                  return t[i];
                },
              });
            }
          : function (e, t, i, r) {
              if (r === undefined) r = i;
              e[r] = t[i];
            });
      var n =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: true, value: t });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var o =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var i in e) if (i !== 'default' && Object.hasOwnProperty.call(e, i)) r(t, e, i);
          n(t, e);
          return t;
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.issue = t.issueCommand = void 0;
      const s = o(i(87));
      const u = i(278);
      function issueCommand(e, t, i) {
        const r = new Command(e, t, i);
        process.stdout.write(r.toString() + s.EOL);
      }
      t.issueCommand = issueCommand;
      function issue(e, t = '') {
        issueCommand(e, {}, t);
      }
      t.issue = issue;
      const c = '::';
      class Command {
        constructor(e, t, i) {
          if (!e) {
            e = 'missing.command';
          }
          this.command = e;
          this.properties = t;
          this.message = i;
        }
        toString() {
          let e = c + this.command;
          if (this.properties && Object.keys(this.properties).length > 0) {
            e += ' ';
            let t = true;
            for (const i in this.properties) {
              if (this.properties.hasOwnProperty(i)) {
                const r = this.properties[i];
                if (r) {
                  if (t) {
                    t = false;
                  } else {
                    e += ',';
                  }
                  e += `${i}=${escapeProperty(r)}`;
                }
              }
            }
          }
          e += `${c}${escapeData(this.message)}`;
          return e;
        }
      }
      function escapeData(e) {
        return u.toCommandValue(e).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
      }
      function escapeProperty(e) {
        return u
          .toCommandValue(e)
          .replace(/%/g, '%25')
          .replace(/\r/g, '%0D')
          .replace(/\n/g, '%0A')
          .replace(/:/g, '%3A')
          .replace(/,/g, '%2C');
      }
    },
    186: function (e, t, i) {
      var r =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, r) {
              if (r === undefined) r = i;
              Object.defineProperty(e, r, {
                enumerable: true,
                get: function () {
                  return t[i];
                },
              });
            }
          : function (e, t, i, r) {
              if (r === undefined) r = i;
              e[r] = t[i];
            });
      var n =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: true, value: t });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var o =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var i in e) if (i !== 'default' && Object.hasOwnProperty.call(e, i)) r(t, e, i);
          n(t, e);
          return t;
        };
      var s =
        (this && this.__awaiter) ||
        function (e, t, i, r) {
          function adopt(e) {
            return e instanceof i
              ? e
              : new i(function (t) {
                  t(e);
                });
          }
          return new (i || (i = Promise))(function (i, n) {
            function fulfilled(e) {
              try {
                step(r.next(e));
              } catch (e) {
                n(e);
              }
            }
            function rejected(e) {
              try {
                step(r['throw'](e));
              } catch (e) {
                n(e);
              }
            }
            function step(e) {
              e.done ? i(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((r = r.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.getState =
        t.saveState =
        t.group =
        t.endGroup =
        t.startGroup =
        t.info =
        t.warning =
        t.error =
        t.debug =
        t.isDebug =
        t.setFailed =
        t.setCommandEcho =
        t.setOutput =
        t.getBooleanInput =
        t.getMultilineInput =
        t.getInput =
        t.addPath =
        t.setSecret =
        t.exportVariable =
        t.ExitCode =
          void 0;
      const u = i(351);
      const c = i(717);
      const a = i(278);
      const l = o(i(87));
      const d = o(i(622));
      var f;
      (function (e) {
        e[(e['Success'] = 0)] = 'Success';
        e[(e['Failure'] = 1)] = 'Failure';
      })((f = t.ExitCode || (t.ExitCode = {})));
      function exportVariable(e, t) {
        const i = a.toCommandValue(t);
        process.env[e] = i;
        const r = process.env['GITHUB_ENV'] || '';
        if (r) {
          const t = '_GitHubActionsFileCommandDelimeter_';
          const r = `${e}<<${t}${l.EOL}${i}${l.EOL}${t}`;
          c.issueCommand('ENV', r);
        } else {
          u.issueCommand('set-env', { name: e }, i);
        }
      }
      t.exportVariable = exportVariable;
      function setSecret(e) {
        u.issueCommand('add-mask', {}, e);
      }
      t.setSecret = setSecret;
      function addPath(e) {
        const t = process.env['GITHUB_PATH'] || '';
        if (t) {
          c.issueCommand('PATH', e);
        } else {
          u.issueCommand('add-path', {}, e);
        }
        process.env['PATH'] = `${e}${d.delimiter}${process.env['PATH']}`;
      }
      t.addPath = addPath;
      function getInput(e, t) {
        const i = process.env[`INPUT_${e.replace(/ /g, '_').toUpperCase()}`] || '';
        if (t && t.required && !i) {
          throw new Error(`Input required and not supplied: ${e}`);
        }
        if (t && t.trimWhitespace === false) {
          return i;
        }
        return i.trim();
      }
      t.getInput = getInput;
      function getMultilineInput(e, t) {
        const i = getInput(e, t)
          .split('\n')
          .filter((e) => e !== '');
        return i;
      }
      t.getMultilineInput = getMultilineInput;
      function getBooleanInput(e, t) {
        const i = ['true', 'True', 'TRUE'];
        const r = ['false', 'False', 'FALSE'];
        const n = getInput(e, t);
        if (i.includes(n)) return true;
        if (r.includes(n)) return false;
        throw new TypeError(
          `Input does not meet YAML 1.2 "Core Schema" specification: ${e}\n` +
            `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``,
        );
      }
      t.getBooleanInput = getBooleanInput;
      function setOutput(e, t) {
        process.stdout.write(l.EOL);
        u.issueCommand('set-output', { name: e }, t);
      }
      t.setOutput = setOutput;
      function setCommandEcho(e) {
        u.issue('echo', e ? 'on' : 'off');
      }
      t.setCommandEcho = setCommandEcho;
      function setFailed(e) {
        process.exitCode = f.Failure;
        error(e);
      }
      t.setFailed = setFailed;
      function isDebug() {
        return process.env['RUNNER_DEBUG'] === '1';
      }
      t.isDebug = isDebug;
      function debug(e) {
        u.issueCommand('debug', {}, e);
      }
      t.debug = debug;
      function error(e) {
        u.issue('error', e instanceof Error ? e.toString() : e);
      }
      t.error = error;
      function warning(e) {
        u.issue('warning', e instanceof Error ? e.toString() : e);
      }
      t.warning = warning;
      function info(e) {
        process.stdout.write(e + l.EOL);
      }
      t.info = info;
      function startGroup(e) {
        u.issue('group', e);
      }
      t.startGroup = startGroup;
      function endGroup() {
        u.issue('endgroup');
      }
      t.endGroup = endGroup;
      function group(e, t) {
        return s(this, void 0, void 0, function* () {
          startGroup(e);
          let i;
          try {
            i = yield t();
          } finally {
            endGroup();
          }
          return i;
        });
      }
      t.group = group;
      function saveState(e, t) {
        u.issueCommand('save-state', { name: e }, t);
      }
      t.saveState = saveState;
      function getState(e) {
        return process.env[`STATE_${e}`] || '';
      }
      t.getState = getState;
    },
    717: function (e, t, i) {
      var r =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, r) {
              if (r === undefined) r = i;
              Object.defineProperty(e, r, {
                enumerable: true,
                get: function () {
                  return t[i];
                },
              });
            }
          : function (e, t, i, r) {
              if (r === undefined) r = i;
              e[r] = t[i];
            });
      var n =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: true, value: t });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var o =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var i in e) if (i !== 'default' && Object.hasOwnProperty.call(e, i)) r(t, e, i);
          n(t, e);
          return t;
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.issueCommand = void 0;
      const s = o(i(747));
      const u = o(i(87));
      const c = i(278);
      function issueCommand(e, t) {
        const i = process.env[`GITHUB_${e}`];
        if (!i) {
          throw new Error(`Unable to find environment variable for file command ${e}`);
        }
        if (!s.existsSync(i)) {
          throw new Error(`Missing file at path: ${i}`);
        }
        s.appendFileSync(i, `${c.toCommandValue(t)}${u.EOL}`, { encoding: 'utf8' });
      }
      t.issueCommand = issueCommand;
    },
    278: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true });
      t.toCommandValue = void 0;
      function toCommandValue(e) {
        if (e === null || e === undefined) {
          return '';
        } else if (typeof e === 'string' || e instanceof String) {
          return e;
        }
        return JSON.stringify(e);
      }
      t.toCommandValue = toCommandValue;
    },
    514: function (e, t, i) {
      var r =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, r) {
              if (r === undefined) r = i;
              Object.defineProperty(e, r, {
                enumerable: true,
                get: function () {
                  return t[i];
                },
              });
            }
          : function (e, t, i, r) {
              if (r === undefined) r = i;
              e[r] = t[i];
            });
      var n =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: true, value: t });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var o =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var i in e) if (i !== 'default' && Object.hasOwnProperty.call(e, i)) r(t, e, i);
          n(t, e);
          return t;
        };
      var s =
        (this && this.__awaiter) ||
        function (e, t, i, r) {
          function adopt(e) {
            return e instanceof i
              ? e
              : new i(function (t) {
                  t(e);
                });
          }
          return new (i || (i = Promise))(function (i, n) {
            function fulfilled(e) {
              try {
                step(r.next(e));
              } catch (e) {
                n(e);
              }
            }
            function rejected(e) {
              try {
                step(r['throw'](e));
              } catch (e) {
                n(e);
              }
            }
            function step(e) {
              e.done ? i(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((r = r.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.getExecOutput = t.exec = void 0;
      const u = i(304);
      const c = o(i(159));
      function exec(e, t, i) {
        return s(this, void 0, void 0, function* () {
          const r = c.argStringToArray(e);
          if (r.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
          }
          const n = r[0];
          t = r.slice(1).concat(t || []);
          const o = new c.ToolRunner(n, t, i);
          return o.exec();
        });
      }
      t.exec = exec;
      function getExecOutput(e, t, i) {
        var r, n;
        return s(this, void 0, void 0, function* () {
          let o = '';
          let s = '';
          const c = new u.StringDecoder('utf8');
          const a = new u.StringDecoder('utf8');
          const l =
            (r = i === null || i === void 0 ? void 0 : i.listeners) === null || r === void 0
              ? void 0
              : r.stdout;
          const d =
            (n = i === null || i === void 0 ? void 0 : i.listeners) === null || n === void 0
              ? void 0
              : n.stderr;
          const stdErrListener = (e) => {
            s += a.write(e);
            if (d) {
              d(e);
            }
          };
          const stdOutListener = (e) => {
            o += c.write(e);
            if (l) {
              l(e);
            }
          };
          const f = Object.assign(
            Object.assign({}, i === null || i === void 0 ? void 0 : i.listeners),
            { stdout: stdOutListener, stderr: stdErrListener },
          );
          const p = yield exec(e, t, Object.assign(Object.assign({}, i), { listeners: f }));
          o += c.end();
          s += a.end();
          return { exitCode: p, stdout: o, stderr: s };
        });
      }
      t.getExecOutput = getExecOutput;
    },
    159: function (e, t, i) {
      var r =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, r) {
              if (r === undefined) r = i;
              Object.defineProperty(e, r, {
                enumerable: true,
                get: function () {
                  return t[i];
                },
              });
            }
          : function (e, t, i, r) {
              if (r === undefined) r = i;
              e[r] = t[i];
            });
      var n =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: true, value: t });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var o =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var i in e) if (i !== 'default' && Object.hasOwnProperty.call(e, i)) r(t, e, i);
          n(t, e);
          return t;
        };
      var s =
        (this && this.__awaiter) ||
        function (e, t, i, r) {
          function adopt(e) {
            return e instanceof i
              ? e
              : new i(function (t) {
                  t(e);
                });
          }
          return new (i || (i = Promise))(function (i, n) {
            function fulfilled(e) {
              try {
                step(r.next(e));
              } catch (e) {
                n(e);
              }
            }
            function rejected(e) {
              try {
                step(r['throw'](e));
              } catch (e) {
                n(e);
              }
            }
            function step(e) {
              e.done ? i(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((r = r.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.argStringToArray = t.ToolRunner = void 0;
      const u = o(i(87));
      const c = o(i(614));
      const a = o(i(129));
      const l = o(i(622));
      const d = o(i(436));
      const f = o(i(962));
      const p = i(213);
      const h = process.platform === 'win32';
      class ToolRunner extends c.EventEmitter {
        constructor(e, t, i) {
          super();
          if (!e) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
          }
          this.toolPath = e;
          this.args = t || [];
          this.options = i || {};
        }
        _debug(e) {
          if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(e);
          }
        }
        _getCommandString(e, t) {
          const i = this._getSpawnFileName();
          const r = this._getSpawnArgs(e);
          let n = t ? '' : '[command]';
          if (h) {
            if (this._isCmdFile()) {
              n += i;
              for (const e of r) {
                n += ` ${e}`;
              }
            } else if (e.windowsVerbatimArguments) {
              n += `"${i}"`;
              for (const e of r) {
                n += ` ${e}`;
              }
            } else {
              n += this._windowsQuoteCmdArg(i);
              for (const e of r) {
                n += ` ${this._windowsQuoteCmdArg(e)}`;
              }
            }
          } else {
            n += i;
            for (const e of r) {
              n += ` ${e}`;
            }
          }
          return n;
        }
        _processLineBuffer(e, t, i) {
          try {
            let r = t + e.toString();
            let n = r.indexOf(u.EOL);
            while (n > -1) {
              const e = r.substring(0, n);
              i(e);
              r = r.substring(n + u.EOL.length);
              n = r.indexOf(u.EOL);
            }
            return r;
          } catch (e) {
            this._debug(`error processing line. Failed with error ${e}`);
            return '';
          }
        }
        _getSpawnFileName() {
          if (h) {
            if (this._isCmdFile()) {
              return process.env['COMSPEC'] || 'cmd.exe';
            }
          }
          return this.toolPath;
        }
        _getSpawnArgs(e) {
          if (h) {
            if (this._isCmdFile()) {
              let t = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
              for (const i of this.args) {
                t += ' ';
                t += e.windowsVerbatimArguments ? i : this._windowsQuoteCmdArg(i);
              }
              t += '"';
              return [t];
            }
          }
          return this.args;
        }
        _endsWith(e, t) {
          return e.endsWith(t);
        }
        _isCmdFile() {
          const e = this.toolPath.toUpperCase();
          return this._endsWith(e, '.CMD') || this._endsWith(e, '.BAT');
        }
        _windowsQuoteCmdArg(e) {
          if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(e);
          }
          if (!e) {
            return '""';
          }
          const t = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"',
          ];
          let i = false;
          for (const r of e) {
            if (t.some((e) => e === r)) {
              i = true;
              break;
            }
          }
          if (!i) {
            return e;
          }
          let r = '"';
          let n = true;
          for (let t = e.length; t > 0; t--) {
            r += e[t - 1];
            if (n && e[t - 1] === '\\') {
              r += '\\';
            } else if (e[t - 1] === '"') {
              n = true;
              r += '"';
            } else {
              n = false;
            }
          }
          r += '"';
          return r.split('').reverse().join('');
        }
        _uvQuoteCmdArg(e) {
          if (!e) {
            return '""';
          }
          if (!e.includes(' ') && !e.includes('\t') && !e.includes('"')) {
            return e;
          }
          if (!e.includes('"') && !e.includes('\\')) {
            return `"${e}"`;
          }
          let t = '"';
          let i = true;
          for (let r = e.length; r > 0; r--) {
            t += e[r - 1];
            if (i && e[r - 1] === '\\') {
              t += '\\';
            } else if (e[r - 1] === '"') {
              i = true;
              t += '\\';
            } else {
              i = false;
            }
          }
          t += '"';
          return t.split('').reverse().join('');
        }
        _cloneExecOptions(e) {
          e = e || {};
          const t = {
            cwd: e.cwd || process.cwd(),
            env: e.env || process.env,
            silent: e.silent || false,
            windowsVerbatimArguments: e.windowsVerbatimArguments || false,
            failOnStdErr: e.failOnStdErr || false,
            ignoreReturnCode: e.ignoreReturnCode || false,
            delay: e.delay || 1e4,
          };
          t.outStream = e.outStream || process.stdout;
          t.errStream = e.errStream || process.stderr;
          return t;
        }
        _getSpawnOptions(e, t) {
          e = e || {};
          const i = {};
          i.cwd = e.cwd;
          i.env = e.env;
          i['windowsVerbatimArguments'] = e.windowsVerbatimArguments || this._isCmdFile();
          if (e.windowsVerbatimArguments) {
            i.argv0 = `"${t}"`;
          }
          return i;
        }
        exec() {
          return s(this, void 0, void 0, function* () {
            if (
              !f.isRooted(this.toolPath) &&
              (this.toolPath.includes('/') || (h && this.toolPath.includes('\\')))
            ) {
              this.toolPath = l.resolve(
                process.cwd(),
                this.options.cwd || process.cwd(),
                this.toolPath,
              );
            }
            this.toolPath = yield d.which(this.toolPath, true);
            return new Promise((e, t) =>
              s(this, void 0, void 0, function* () {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const e of this.args) {
                  this._debug(`   ${e}`);
                }
                const i = this._cloneExecOptions(this.options);
                if (!i.silent && i.outStream) {
                  i.outStream.write(this._getCommandString(i) + u.EOL);
                }
                const r = new ExecState(i, this.toolPath);
                r.on('debug', (e) => {
                  this._debug(e);
                });
                if (this.options.cwd && !(yield f.exists(this.options.cwd))) {
                  return t(new Error(`The cwd: ${this.options.cwd} does not exist!`));
                }
                const n = this._getSpawnFileName();
                const o = a.spawn(n, this._getSpawnArgs(i), this._getSpawnOptions(this.options, n));
                let s = '';
                if (o.stdout) {
                  o.stdout.on('data', (e) => {
                    if (this.options.listeners && this.options.listeners.stdout) {
                      this.options.listeners.stdout(e);
                    }
                    if (!i.silent && i.outStream) {
                      i.outStream.write(e);
                    }
                    s = this._processLineBuffer(e, s, (e) => {
                      if (this.options.listeners && this.options.listeners.stdline) {
                        this.options.listeners.stdline(e);
                      }
                    });
                  });
                }
                let c = '';
                if (o.stderr) {
                  o.stderr.on('data', (e) => {
                    r.processStderr = true;
                    if (this.options.listeners && this.options.listeners.stderr) {
                      this.options.listeners.stderr(e);
                    }
                    if (!i.silent && i.errStream && i.outStream) {
                      const t = i.failOnStdErr ? i.errStream : i.outStream;
                      t.write(e);
                    }
                    c = this._processLineBuffer(e, c, (e) => {
                      if (this.options.listeners && this.options.listeners.errline) {
                        this.options.listeners.errline(e);
                      }
                    });
                  });
                }
                o.on('error', (e) => {
                  r.processError = e.message;
                  r.processExited = true;
                  r.processClosed = true;
                  r.CheckComplete();
                });
                o.on('exit', (e) => {
                  r.processExitCode = e;
                  r.processExited = true;
                  this._debug(`Exit code ${e} received from tool '${this.toolPath}'`);
                  r.CheckComplete();
                });
                o.on('close', (e) => {
                  r.processExitCode = e;
                  r.processExited = true;
                  r.processClosed = true;
                  this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                  r.CheckComplete();
                });
                r.on('done', (i, r) => {
                  if (s.length > 0) {
                    this.emit('stdline', s);
                  }
                  if (c.length > 0) {
                    this.emit('errline', c);
                  }
                  o.removeAllListeners();
                  if (i) {
                    t(i);
                  } else {
                    e(r);
                  }
                });
                if (this.options.input) {
                  if (!o.stdin) {
                    throw new Error('child process missing stdin');
                  }
                  o.stdin.end(this.options.input);
                }
              }),
            );
          });
        }
      }
      t.ToolRunner = ToolRunner;
      function argStringToArray(e) {
        const t = [];
        let i = false;
        let r = false;
        let n = '';
        function append(e) {
          if (r && e !== '"') {
            n += '\\';
          }
          n += e;
          r = false;
        }
        for (let o = 0; o < e.length; o++) {
          const s = e.charAt(o);
          if (s === '"') {
            if (!r) {
              i = !i;
            } else {
              append(s);
            }
            continue;
          }
          if (s === '\\' && r) {
            append(s);
            continue;
          }
          if (s === '\\' && i) {
            r = true;
            continue;
          }
          if (s === ' ' && !i) {
            if (n.length > 0) {
              t.push(n);
              n = '';
            }
            continue;
          }
          append(s);
        }
        if (n.length > 0) {
          t.push(n.trim());
        }
        return t;
      }
      t.argStringToArray = argStringToArray;
      class ExecState extends c.EventEmitter {
        constructor(e, t) {
          super();
          this.processClosed = false;
          this.processError = '';
          this.processExitCode = 0;
          this.processExited = false;
          this.processStderr = false;
          this.delay = 1e4;
          this.done = false;
          this.timeout = null;
          if (!t) {
            throw new Error('toolPath must not be empty');
          }
          this.options = e;
          this.toolPath = t;
          if (e.delay) {
            this.delay = e.delay;
          }
        }
        CheckComplete() {
          if (this.done) {
            return;
          }
          if (this.processClosed) {
            this._setResult();
          } else if (this.processExited) {
            this.timeout = p.setTimeout(ExecState.HandleTimeout, this.delay, this);
          }
        }
        _debug(e) {
          this.emit('debug', e);
        }
        _setResult() {
          let e;
          if (this.processExited) {
            if (this.processError) {
              e = new Error(
                `There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`,
              );
            } else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
              e = new Error(
                `The process '${this.toolPath}' failed with exit code ${this.processExitCode}`,
              );
            } else if (this.processStderr && this.options.failOnStdErr) {
              e = new Error(
                `The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`,
              );
            }
          }
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          this.done = true;
          this.emit('done', e, this.processExitCode);
        }
        static HandleTimeout(e) {
          if (e.done) {
            return;
          }
          if (!e.processClosed && e.processExited) {
            const t = `The STDIO streams did not close within ${
              e.delay / 1e3
            } seconds of the exit event from process '${
              e.toolPath
            }'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            e._debug(t);
          }
          e._setResult();
        }
      }
    },
    962: function (e, t, i) {
      var r =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, r) {
              if (r === undefined) r = i;
              Object.defineProperty(e, r, {
                enumerable: true,
                get: function () {
                  return t[i];
                },
              });
            }
          : function (e, t, i, r) {
              if (r === undefined) r = i;
              e[r] = t[i];
            });
      var n =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: true, value: t });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var o =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var i in e) if (i !== 'default' && Object.hasOwnProperty.call(e, i)) r(t, e, i);
          n(t, e);
          return t;
        };
      var s =
        (this && this.__awaiter) ||
        function (e, t, i, r) {
          function adopt(e) {
            return e instanceof i
              ? e
              : new i(function (t) {
                  t(e);
                });
          }
          return new (i || (i = Promise))(function (i, n) {
            function fulfilled(e) {
              try {
                step(r.next(e));
              } catch (e) {
                n(e);
              }
            }
            function rejected(e) {
              try {
                step(r['throw'](e));
              } catch (e) {
                n(e);
              }
            }
            function step(e) {
              e.done ? i(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((r = r.apply(e, t || [])).next());
          });
        };
      var u;
      Object.defineProperty(t, '__esModule', { value: true });
      t.getCmdPath =
        t.tryGetExecutablePath =
        t.isRooted =
        t.isDirectory =
        t.exists =
        t.IS_WINDOWS =
        t.unlink =
        t.symlink =
        t.stat =
        t.rmdir =
        t.rename =
        t.readlink =
        t.readdir =
        t.mkdir =
        t.lstat =
        t.copyFile =
        t.chmod =
          void 0;
      const c = o(i(747));
      const a = o(i(622));
      (u = c.promises),
        (t.chmod = u.chmod),
        (t.copyFile = u.copyFile),
        (t.lstat = u.lstat),
        (t.mkdir = u.mkdir),
        (t.readdir = u.readdir),
        (t.readlink = u.readlink),
        (t.rename = u.rename),
        (t.rmdir = u.rmdir),
        (t.stat = u.stat),
        (t.symlink = u.symlink),
        (t.unlink = u.unlink);
      t.IS_WINDOWS = process.platform === 'win32';
      function exists(e) {
        return s(this, void 0, void 0, function* () {
          try {
            yield t.stat(e);
          } catch (e) {
            if (e.code === 'ENOENT') {
              return false;
            }
            throw e;
          }
          return true;
        });
      }
      t.exists = exists;
      function isDirectory(e, i = false) {
        return s(this, void 0, void 0, function* () {
          const r = i ? yield t.stat(e) : yield t.lstat(e);
          return r.isDirectory();
        });
      }
      t.isDirectory = isDirectory;
      function isRooted(e) {
        e = normalizeSeparators(e);
        if (!e) {
          throw new Error('isRooted() parameter "p" cannot be empty');
        }
        if (t.IS_WINDOWS) {
          return e.startsWith('\\') || /^[A-Z]:/i.test(e);
        }
        return e.startsWith('/');
      }
      t.isRooted = isRooted;
      function tryGetExecutablePath(e, i) {
        return s(this, void 0, void 0, function* () {
          let r = undefined;
          try {
            r = yield t.stat(e);
          } catch (t) {
            if (t.code !== 'ENOENT') {
              console.log(
                `Unexpected error attempting to determine if executable file exists '${e}': ${t}`,
              );
            }
          }
          if (r && r.isFile()) {
            if (t.IS_WINDOWS) {
              const t = a.extname(e).toUpperCase();
              if (i.some((e) => e.toUpperCase() === t)) {
                return e;
              }
            } else {
              if (isUnixExecutable(r)) {
                return e;
              }
            }
          }
          const n = e;
          for (const o of i) {
            e = n + o;
            r = undefined;
            try {
              r = yield t.stat(e);
            } catch (t) {
              if (t.code !== 'ENOENT') {
                console.log(
                  `Unexpected error attempting to determine if executable file exists '${e}': ${t}`,
                );
              }
            }
            if (r && r.isFile()) {
              if (t.IS_WINDOWS) {
                try {
                  const i = a.dirname(e);
                  const r = a.basename(e).toUpperCase();
                  for (const n of yield t.readdir(i)) {
                    if (r === n.toUpperCase()) {
                      e = a.join(i, n);
                      break;
                    }
                  }
                } catch (t) {
                  console.log(
                    `Unexpected error attempting to determine the actual case of the file '${e}': ${t}`,
                  );
                }
                return e;
              } else {
                if (isUnixExecutable(r)) {
                  return e;
                }
              }
            }
          }
          return '';
        });
      }
      t.tryGetExecutablePath = tryGetExecutablePath;
      function normalizeSeparators(e) {
        e = e || '';
        if (t.IS_WINDOWS) {
          e = e.replace(/\//g, '\\');
          return e.replace(/\\\\+/g, '\\');
        }
        return e.replace(/\/\/+/g, '/');
      }
      function isUnixExecutable(e) {
        return (
          (e.mode & 1) > 0 ||
          ((e.mode & 8) > 0 && e.gid === process.getgid()) ||
          ((e.mode & 64) > 0 && e.uid === process.getuid())
        );
      }
      function getCmdPath() {
        var e;
        return (e = process.env['COMSPEC']) !== null && e !== void 0 ? e : `cmd.exe`;
      }
      t.getCmdPath = getCmdPath;
    },
    436: function (e, t, i) {
      var r =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, i, r) {
              if (r === undefined) r = i;
              Object.defineProperty(e, r, {
                enumerable: true,
                get: function () {
                  return t[i];
                },
              });
            }
          : function (e, t, i, r) {
              if (r === undefined) r = i;
              e[r] = t[i];
            });
      var n =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: true, value: t });
            }
          : function (e, t) {
              e['default'] = t;
            });
      var o =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (e != null)
            for (var i in e) if (i !== 'default' && Object.hasOwnProperty.call(e, i)) r(t, e, i);
          n(t, e);
          return t;
        };
      var s =
        (this && this.__awaiter) ||
        function (e, t, i, r) {
          function adopt(e) {
            return e instanceof i
              ? e
              : new i(function (t) {
                  t(e);
                });
          }
          return new (i || (i = Promise))(function (i, n) {
            function fulfilled(e) {
              try {
                step(r.next(e));
              } catch (e) {
                n(e);
              }
            }
            function rejected(e) {
              try {
                step(r['throw'](e));
              } catch (e) {
                n(e);
              }
            }
            function step(e) {
              e.done ? i(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((r = r.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, '__esModule', { value: true });
      t.findInPath = t.which = t.mkdirP = t.rmRF = t.mv = t.cp = void 0;
      const u = i(357);
      const c = o(i(129));
      const a = o(i(622));
      const l = i(669);
      const d = o(i(962));
      const f = l.promisify(c.exec);
      const p = l.promisify(c.execFile);
      function cp(e, t, i = {}) {
        return s(this, void 0, void 0, function* () {
          const { force: r, recursive: n, copySourceDirectory: o } = readCopyOptions(i);
          const s = (yield d.exists(t)) ? yield d.stat(t) : null;
          if (s && s.isFile() && !r) {
            return;
          }
          const u = s && s.isDirectory() && o ? a.join(t, a.basename(e)) : t;
          if (!(yield d.exists(e))) {
            throw new Error(`no such file or directory: ${e}`);
          }
          const c = yield d.stat(e);
          if (c.isDirectory()) {
            if (!n) {
              throw new Error(
                `Failed to copy. ${e} is a directory, but tried to copy without recursive flag.`,
              );
            } else {
              yield cpDirRecursive(e, u, 0, r);
            }
          } else {
            if (a.relative(e, u) === '') {
              throw new Error(`'${u}' and '${e}' are the same file`);
            }
            yield copyFile(e, u, r);
          }
        });
      }
      t.cp = cp;
      function mv(e, t, i = {}) {
        return s(this, void 0, void 0, function* () {
          if (yield d.exists(t)) {
            let r = true;
            if (yield d.isDirectory(t)) {
              t = a.join(t, a.basename(e));
              r = yield d.exists(t);
            }
            if (r) {
              if (i.force == null || i.force) {
                yield rmRF(t);
              } else {
                throw new Error('Destination already exists');
              }
            }
          }
          yield mkdirP(a.dirname(t));
          yield d.rename(e, t);
        });
      }
      t.mv = mv;
      function rmRF(e) {
        return s(this, void 0, void 0, function* () {
          if (d.IS_WINDOWS) {
            if (/[*"<>|]/.test(e)) {
              throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
            }
            try {
              const t = d.getCmdPath();
              if (yield d.isDirectory(e, true)) {
                yield f(`${t} /s /c "rd /s /q "%inputPath%""`, { env: { inputPath: e } });
              } else {
                yield f(`${t} /s /c "del /f /a "%inputPath%""`, { env: { inputPath: e } });
              }
            } catch (e) {
              if (e.code !== 'ENOENT') throw e;
            }
            try {
              yield d.unlink(e);
            } catch (e) {
              if (e.code !== 'ENOENT') throw e;
            }
          } else {
            let t = false;
            try {
              t = yield d.isDirectory(e);
            } catch (e) {
              if (e.code !== 'ENOENT') throw e;
              return;
            }
            if (t) {
              yield p(`rm`, [`-rf`, `${e}`]);
            } else {
              yield d.unlink(e);
            }
          }
        });
      }
      t.rmRF = rmRF;
      function mkdirP(e) {
        return s(this, void 0, void 0, function* () {
          u.ok(e, 'a path argument must be provided');
          yield d.mkdir(e, { recursive: true });
        });
      }
      t.mkdirP = mkdirP;
      function which(e, t) {
        return s(this, void 0, void 0, function* () {
          if (!e) {
            throw new Error("parameter 'tool' is required");
          }
          if (t) {
            const t = yield which(e, false);
            if (!t) {
              if (d.IS_WINDOWS) {
                throw new Error(
                  `Unable to locate executable file: ${e}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`,
                );
              } else {
                throw new Error(
                  `Unable to locate executable file: ${e}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`,
                );
              }
            }
            return t;
          }
          const i = yield findInPath(e);
          if (i && i.length > 0) {
            return i[0];
          }
          return '';
        });
      }
      t.which = which;
      function findInPath(e) {
        return s(this, void 0, void 0, function* () {
          if (!e) {
            throw new Error("parameter 'tool' is required");
          }
          const t = [];
          if (d.IS_WINDOWS && process.env['PATHEXT']) {
            for (const e of process.env['PATHEXT'].split(a.delimiter)) {
              if (e) {
                t.push(e);
              }
            }
          }
          if (d.isRooted(e)) {
            const i = yield d.tryGetExecutablePath(e, t);
            if (i) {
              return [i];
            }
            return [];
          }
          if (e.includes(a.sep)) {
            return [];
          }
          const i = [];
          if (process.env.PATH) {
            for (const e of process.env.PATH.split(a.delimiter)) {
              if (e) {
                i.push(e);
              }
            }
          }
          const r = [];
          for (const n of i) {
            const i = yield d.tryGetExecutablePath(a.join(n, e), t);
            if (i) {
              r.push(i);
            }
          }
          return r;
        });
      }
      t.findInPath = findInPath;
      function readCopyOptions(e) {
        const t = e.force == null ? true : e.force;
        const i = Boolean(e.recursive);
        const r = e.copySourceDirectory == null ? true : Boolean(e.copySourceDirectory);
        return { force: t, recursive: i, copySourceDirectory: r };
      }
      function cpDirRecursive(e, t, i, r) {
        return s(this, void 0, void 0, function* () {
          if (i >= 255) return;
          i++;
          yield mkdirP(t);
          const n = yield d.readdir(e);
          for (const o of n) {
            const n = `${e}/${o}`;
            const s = `${t}/${o}`;
            const u = yield d.lstat(n);
            if (u.isDirectory()) {
              yield cpDirRecursive(n, s, i, r);
            } else {
              yield copyFile(n, s, r);
            }
          }
          yield d.chmod(t, (yield d.stat(e)).mode);
        });
      }
      function copyFile(e, t, i) {
        return s(this, void 0, void 0, function* () {
          if ((yield d.lstat(e)).isSymbolicLink()) {
            try {
              yield d.lstat(t);
              yield d.unlink(t);
            } catch (e) {
              if (e.code === 'EPERM') {
                yield d.chmod(t, '0666');
                yield d.unlink(t);
              }
            }
            const i = yield d.readlink(e);
            yield d.symlink(i, t, d.IS_WINDOWS ? 'junction' : null);
          } else if (!(yield d.exists(t)) || i) {
            yield d.copyFile(e, t);
          }
        });
      }
    },
    357: (e) => {
      e.exports = require('assert');
    },
    129: (e) => {
      e.exports = require('child_process');
    },
    614: (e) => {
      e.exports = require('events');
    },
    747: (e) => {
      e.exports = require('fs');
    },
    87: (e) => {
      e.exports = require('os');
    },
    622: (e) => {
      e.exports = require('path');
    },
    304: (e) => {
      e.exports = require('string_decoder');
    },
    213: (e) => {
      e.exports = require('timers');
    },
    669: (e) => {
      e.exports = require('util');
    },
  };
  var t = {};
  function __nccwpck_require__(i) {
    var r = t[i];
    if (r !== undefined) {
      return r.exports;
    }
    var n = (t[i] = { exports: {} });
    var o = true;
    try {
      e[i].call(n.exports, n, n.exports, __nccwpck_require__);
      o = false;
    } finally {
      if (o) delete t[i];
    }
    return n.exports;
  }
  (() => {
    __nccwpck_require__.n = (e) => {
      var t = e && e.__esModule ? () => e['default'] : () => e;
      __nccwpck_require__.d(t, { a: t });
      return t;
    };
  })();
  (() => {
    __nccwpck_require__.d = (e, t) => {
      for (var i in t) {
        if (__nccwpck_require__.o(t, i) && !__nccwpck_require__.o(e, i)) {
          Object.defineProperty(e, i, { enumerable: true, get: t[i] });
        }
      }
    };
  })();
  (() => {
    __nccwpck_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
  })();
  (() => {
    __nccwpck_require__.r = (e) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(e, '__esModule', { value: true });
    };
  })();
  if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + '/';
  var i = {};
  (() => {
    __nccwpck_require__.r(i);
    var e = __nccwpck_require__(186);
    var t = __nccwpck_require__.n(e);
    var r = __nccwpck_require__(514);
    var n = __nccwpck_require__.n(r);
    var o =
      (undefined && undefined.__awaiter) ||
      function (e, t, i, r) {
        function adopt(e) {
          return e instanceof i
            ? e
            : new i(function (t) {
                t(e);
              });
        }
        return new (i || (i = Promise))(function (i, n) {
          function fulfilled(e) {
            try {
              step(r.next(e));
            } catch (e) {
              n(e);
            }
          }
          function rejected(e) {
            try {
              step(r['throw'](e));
            } catch (e) {
              n(e);
            }
          }
          function step(e) {
            e.done ? i(e.value) : adopt(e.value).then(fulfilled, rejected);
          }
          step((r = r.apply(e, t || [])).next());
        });
      };
    const s = 'browser';
    const u = 'all';
    const c = 'test-runner';
    const runTests = () =>
      o(void 0, void 0, void 0, function* () {
        try {
          const t = (0, e.getInput)(s) || u;
          (0, e.info)(`Using browser set to "${t}"`);
          let i = '';
          const n = {
            listeners: {
              stdout: (e) => {
                i += e.toString();
              },
            },
          };
          if ((yield (0, r.exec)(`yarn`, [], n)) !== 0) {
            (0, e.setFailed)(`Couldn't install dependencies`);
            return;
          }
          if ((yield (0, r.exec)(`yarn test ./tests`, [`browser=${t}`], n)) !== 0) {
            (0, e.setFailed)('Running tests failed');
            return;
          }
          (0, e.setOutput)(c, i);
        } catch (t) {
          (0, e.setFailed)(t.message);
        }
      });
    void runTests();
  })();
  module.exports = i;
})();
