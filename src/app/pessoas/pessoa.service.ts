import { environment } from './../../environments/environment';
import { Pessoa, Estado, Cidade } from './../core/model';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

 pessoasUrl: string;
 cidadesUrl: string;
 estadosUrl: string;

constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
}


  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params =  params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { params })
    .toPromise()
    .then(response => {
        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements']
        };

        return resultado;
      });
   }

   listarTodas(): Promise<any> {
    return this.http.get( this.pessoasUrl)
      .toPromise()
      .then(response => response['content']);
   }

   adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(
      this.pessoasUrl, pessoa)
    .toPromise();
   }

   excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
   }

   mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);

   }

   atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(
      `${this.pessoasUrl}/${pessoa.codigo}`, pessoa
    ).toPromise();
   }

   buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl)
      .toPromise();

  }

  pesquisarCidade(estado): Promise<Cidade[]> {
    let params = new HttpParams();
    params = params.set('estado', estado);
    return this.http.get<Cidade[]>(this.cidadesUrl, {params})
      .toPromise();
  }
 }
