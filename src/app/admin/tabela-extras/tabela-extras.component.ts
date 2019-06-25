import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { prefixo } from 'src/app/registros/models/url';

@Component({
  selector: 'app-tabela-extras',
  templateUrl: './tabela-extras.component.html',
  styleUrls: ['./tabela-extras.component.css']
})
export class TabelaExtrasComponent implements OnInit {

  json: any;
  displayedColumns: string[];
  // tslint:disable-next-line: no-use-before-declare
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  usuario: string;
  inicio: string;
  fim: string;
  periodo = false;

  constructor(public dialog: MatDialog, public adm: AdminService) { }

  ngOnInit() {
    if (window.innerWidth <= 360) {
      this.displayedColumns = ['documento', 'horaini', 'horafim'];
    } else {
      this.displayedColumns  = ['documento', 'horaini', 'diaini', 'horafim', 'diafim'];
    }
    this.buscarExtras();
  }

  buscarExtras() {
    this.adm.buscarExtras(prefixo).subscribe(res => {
      this.json = res;
      this.json.map(item => item.DIAINI = (new Date(item.DIAINI).toLocaleDateString('pt-BR')));
      this.json.map(item => item.DIAFIM = (new Date(item.DIAFIM).toLocaleDateString('pt-BR')));
      this.json.map(item => item.HORAINI = (new Date(item.HORAINI).toLocaleTimeString('pt-BR')));
      this.json.map(item => item.HORAFIM = (new Date(item.HORAFIM).toLocaleTimeString('pt-BR')));
      this.dataSource = new MatTableDataSource(this.json);
      this.dataSource.paginator = this.paginator;
    });
  }

  buscarExtraParams() {
    this.adm.buscarPorUsuario(prefixo, 'extra', this.usuario, this.inicio, this.fim, this.periodo).subscribe(res => {
      this.json = res;
      console.log(res);
      this.json.map(item => item.DIAINI = (new Date(item.DIAINI).toLocaleDateString('pt-BR')));
      this.json.map(item => item.DIAFIM = (new Date(item.DIAFIM).toLocaleDateString('pt-BR')));
      this.json.map(item => item.HORAINI = (new Date(item.HORAINI).toLocaleTimeString('pt-BR')));
      this.json.map(item => item.HORAFIM = (new Date(item.HORAFIM).toLocaleTimeString('pt-BR')));
      this.dataSource = new MatTableDataSource(this.json);
      this.dataSource.paginator = this.paginator;
    });
  }

}
