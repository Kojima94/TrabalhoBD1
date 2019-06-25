import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { prefixo } from 'src/app/registros/models/url';
import { CriarExternosComponent } from '../criar-externos/criar-externos.component';
import { DeleteExternosComponent } from '../delete-externos/delete-externos.component';

@Component({
  selector: 'app-tabela-externos',
  templateUrl: './tabela-externos.component.html',
  styleUrls: ['./tabela-externos.component.css']
})
export class TabelaExternosComponent implements OnInit {

  json: any;
  documento: number;
  nome: string;
  dataSource: any;
  displayedColumns: string[];
  // tslint:disable-next-line: no-use-before-declare
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public adm: AdminService) {
  }

  ngOnInit() {
    if (window.innerWidth <= 360) {
      this.displayedColumns = ['documento', 'nome', 'acoes'];
    } else {
      this.displayedColumns = ['documento', 'nome', 'contato', 'acoes'];
    }
    this.buscarExternos();
  }

  buscarExternos() {
    this.adm.buscarExternos(prefixo).subscribe(res => {
      console.log(res);
      this.json = res;
      this.dataSource = new MatTableDataSource(this.json);
      this.dataSource.paginator = this.paginator;
    });
  }

  openAdd(): void {
    const dialogRef = this.dialog.open(CriarExternosComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarExternos();
    });
  }

  openDelete(edocumento): void {
    const dialogRef = this.dialog.open(DeleteExternosComponent, {
      data: {documento: edocumento}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarExternos();
    });
  }

}
