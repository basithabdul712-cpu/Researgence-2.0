/*
 * Minimal polyfills inlined in main.ts
 * - zone.js: Required by Angular for change detection
 * - global shim: Now defined in index.html before webpack loads
 */
import '@angular/localize/init'
import 'zone.js';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
