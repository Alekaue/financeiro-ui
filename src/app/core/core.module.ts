import { ErrorHandlerService } from './error-handler.service';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyModule } from 'ng2-toasty';
import { JwtHelperService } from '@auth0/angular-jwt';

import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { CategoriaService } from '../categorias/categoria.service';
import { RelatoriosService } from './../relatorios/relatorios.service';

import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './../seguranca/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';



@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent],
    exports: [
      NavbarComponent,
      ToastyModule,
      ConfirmDialogModule
    ],
    providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    RelatoriosService,
    ErrorHandlerService,
    AuthService,

    ConfirmationService,
    JwtHelperService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
    ],
    imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,

  ]
})
export class CoreModule { }
