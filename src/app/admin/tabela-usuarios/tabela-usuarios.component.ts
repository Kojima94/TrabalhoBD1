import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { prefixo } from 'src/app/registros/models/url';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from '../delete-usuario/delete-usuario.component';
import { CriarUsuarioComponent } from '../criar-usuario/criar-usuario.component';

@Component({
  selector: 'app-tabela-usuarios',
  templateUrl: './tabela-usuarios.component.html',
  styleUrls: ['./tabela-usuarios.component.css']
})
export class TabelaUsuariosComponent implements OnInit, AfterViewInit {

  json: any;
  ctpsUsuario: number;
  nomeUsuario: string;
  dataSource: any;
  displayedColumns: string[];
  // tslint:disable-next-line: no-use-before-declare
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public adm: AdminService) {
  }

  ngOnInit() {
    if (window.innerWidth <= 360) {
      this.displayedColumns = ['login', 'acoes'];
    } else {
      this.displayedColumns = ['ctps', 'nome', 'login', 'role', 'cargahr', 'acoes'];
    }
    this.buscarUsuarios();
  }

  ngAfterViewInit() {
  }

  openEdit(uctps, unome, ulogin, urole, ucargahr): void {
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      data: {ctps: uctps, nome: unome, login: ulogin, role: urole, cargahr: ucargahr}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarUsuarios();
    });
  }


  openDelete(uctps): void {
    const dialogRef = this.dialog.open(DeleteUsuarioComponent, {
      data: {ctps: uctps}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarUsuarios();
    });
  }

  openAdd(): void {
    const dialogRef = this.dialog.open(CriarUsuarioComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarUsuarios();
    });
  }

  buscarUsuarios() {
    this.adm.buscarUsuarios(prefixo).subscribe(res => {
      this.json = res;
      this.dataSource = new MatTableDataSource(this.json);
      this.dataSource.paginator = this.paginator;
    });
  }

  buscarUsuarioPorParam() {
    this.adm.buscarUsuarioPorParam(prefixo, this.ctpsUsuario, this.nomeUsuario).subscribe(res => {
      this.json = res;
      this.dataSource = new MatTableDataSource(this.json);
      this.dataSource.paginator = this.paginator;
    });
  }

}
