// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { PageConfig, URLExt } from '@jupyterlab/coreutils';

import { JupyterLiteServer, JupyterLiteServerPlugin } from '@jupyterlite/server';

import { IKernel, IKernelSpecs } from '@jupyterlite/kernel';

import { PyoliteKernel } from '@jupyterlite/pyolite-kernel';

/**
 * The default CDN fallback for Pyodide
 */
const PYODIDE_CDN_URL = 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js';

/**
 * A plugin to register the Pyodide kernel.
 */
const kernel: JupyterLiteServerPlugin<void> = {
  id: '@jupyterlite/pyolite-kernel-extension:kernel',
  autoStart: true,
  requires: [IKernelSpecs],
  activate: (app: JupyterLiteServer, kernelspecs: IKernelSpecs) => {
    const baseUrl = PageConfig.getBaseUrl();
    const url = PageConfig.getOption('pyodideUrl') || PYODIDE_CDN_URL;
    const pyodideUrl = URLExt.parse(url).href;
    const rawPipUrls = JSON.parse(PageConfig.getOption('micropipUrls') || '[]');
    const micropipUrls = rawPipUrls.map((pipUrl: string) => URLExt.parse(pipUrl).href);

    kernelspecs.register({
      spec: {
        name: 'python',
        display_name: 'Pyolite',
        language: 'python',
        argv: [],
        spec: {
          argv: [],
          env: {},
          display_name: 'Pyolite',
          language: 'python',
          interrupt_mode: 'message',
          metadata: {}
        },
        resources: {
          'logo-32x32': 'TODO',
          'logo-64x64': URLExt.join(baseUrl, '/kernelspecs/python.png')
        }
      },
      create: async (options: IKernel.IOptions): Promise<IKernel> => {
        return new PyoliteKernel({
          ...options,
          pyodideUrl,
          micropipUrls
        });
      }
    });
  }
};

const plugins: JupyterLiteServerPlugin<any>[] = [kernel];

export default plugins;
