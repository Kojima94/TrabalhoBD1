import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { EditRegistroComponent } from '../edit-registro/edit-registro.component';
import { DeleteRegistroComponent } from '../delete-registro/delete-registro.component';
import { prefixo } from 'src/app/registros/models/url';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-tabela-registros',
  templateUrl: './tabela-registros.component.html',
  styleUrls: ['./tabela-registros.component.css']
})

export class TabelaRegistrosComponent implements OnInit {

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
      this.displayedColumns = ['nome', 'hora', 'acoes'];
    } else {
      this.displayedColumns  = ['nome', 'tipo', 'hora', 'dia', 'acoes'];
    }
    this.buscarRegistros();
  }

  openEdit(rctps, rhora, rdia, rtipo): void {
    const dialogRef = this.dialog.open(EditRegistroComponent, {
      data: {ctps: rctps, hora: rhora, dia: rdia, tipo: rtipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarRegistros();
    });
  }

  openDelete(rctps): void {
    const dialogRef = this.dialog.open(DeleteRegistroComponent, {
      data: {ctps: rctps}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarRegistros();
    });
  }

  buscarRegistros() {
    this.adm.buscarRegistros(prefixo).subscribe(res => {
      console.log(res);
      this.json = res;
      this.json.map(item => item.DIA = (new Date(item.DIA).toLocaleDateString('pt-BR')));
      this.json.map(item => item.HORA = (new Date(item.HORA).toLocaleTimeString('pt-BR')));
      this.dataSource = new MatTableDataSource(this.json);
      this.dataSource.paginator = this.paginator;
    });
  }

  buscarRegUsuario() {
    this.adm.buscarPorUsuario(prefixo, 'registro', this.usuario, this.inicio, this.fim, this.periodo).subscribe(res => {
      console.log(res);
      this.json = res;
      this.json.map(item => item.DIA = (new Date(item.DIA).toLocaleDateString('pt-BR')));
      this.json.map(item => item.HORA = (new Date(item.HORA).toLocaleTimeString('pt-BR')));
      this.dataSource = new MatTableDataSource(this.json);
      this.dataSource.paginator = this.paginator;
    });
  }

}
