import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/pluck';

platformBrowserDynamic().bootstrapModule(AppModule);
