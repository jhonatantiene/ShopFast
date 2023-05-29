import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs/login',
    loadChildren: () => import('./tela-login/tela-login.module').then( m => m.TelaLoginPageModule)
  },
  {
    path: 'tabs/cadastro',
    loadChildren: () => import('./tela-cadastro/tela-cadastro.module').then( m => m.TelaCadastroPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
