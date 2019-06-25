import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient) { }

  buscarUsuarios(prefixo) {
    return this.http.get(prefixo + 'usuarios');
  }

  buscarExternos(prefixo) {
    return this.http.get(prefixo + 'externos');
  }

  buscarUsuarioPorParam(prefixo, ctps, nome) {
    let params = new HttpParams();
    if (ctps) {
      params = params.set('ctps', ctps);
    }
    if (nome) {
      params = params.set('nome', nome);
    }
    return this.http.get(prefixo + 'usuario', {params});
  }

  buscarRegistros(prefixo) {
    const params = new HttpParams().set('data', this.reorderString(new Date().toLocaleDateString('pt-BR')));
    return this.http.get(prefixo + 'registros', {params});
  }

  atualizarRegistro(prefixo, json) {
    const params = new HttpParams().append('ctps', json.ctps)
    .append('hora', json.hora).append('data', json.data)
    .append('tipo', json.tipo);
    return this.http.patch(prefixo + 'registro', params);
  }

  apagarRegistro(prefixo, ctps) {
    const params = new HttpParams().append('ctps', ctps);
    return this.http.delete(prefixo + 'registro', {params});
  }

  buscarExtras(prefixo) {
    const params = new HttpParams().set('data', this.reorderString(new Date().toLocaleDateString('pt-BR')));
    return this.http.get(prefixo + 'extras', {params});
  }

  atualizarUsuario(prefixo, json) {
    let params = new HttpParams().append('ctps', json.ctps)
    .append('nome', json.nome)
    .append('login', json.login).append('role', json.role)
    .append('cargahr', json.cargahr);
    if (json.senha !== '') {
      params = params.append('senha', json.senha);
    }
    return this.http.patch(prefixo + 'usuario', params);
  }

  apagarUsuario(prefixo, ctps) {
    const params = new HttpParams().append('ctps', ctps);
    return this.http.delete(prefixo + 'usuario', {params});
  }

  apagarExterno(prefixo, documento) {
    const params = new HttpParams().append('documento', documento);
    return this.http.delete(prefixo + 'externo', {params});
  }

  addUsuario(prefixo, form) {
    const params = new HttpParams()
    .append('nome', form.nomeInput).append('ctps', form.ctpsInput)
    .append('login', form.usuarioInput).append('senha', form.senhaInput)
    .append('role', form.roleSelect).append('cargahr', form.cargaHrInput);

    return this.http.post(prefixo + 'usuario', params);
  }

  addExterno(prefixo, form) {
    const params = new HttpParams()
    .append('nome', form.nomeInput).append('documento', form.documentoInput)
    .append('contato', form.contatoInput);

    return this.http.post(prefixo + 'externo', params);
  }

  buscarPorUsuario(prefixo, endpoint, usuario, inicio, fim, periodo) {
    let params = new HttpParams();
    if (usuario) {
      params = params.set('user', usuario);
    }
    if (periodo) {
      params = params.set('periodo', periodo);
    }
    if (inicio) {
      params = params.set('inicio', this.reorderString(inicio));
    }
    if (fim) {
      params = params.set('fim', this.reorderString(fim));
    }
    return this.http.get(prefixo + endpoint, {params});
  }

  reorderString(str) {
    const dd = str.slice(0, 3);
    const mm = str.slice(3, 6);
    const aa = str.slice(6, 10);

    return mm + dd + aa;
  }

}
