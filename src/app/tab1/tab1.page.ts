import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from '../serviços/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  imagens: any[] = [
    { src: '/assets/img/bannerMerc.jpg' },
    { src: '/assets/img/BANNER_CARRINHO_CHEIO.jpg' },
    { src: '/assets/img/supermarket.jpg' },
    { src: '/assets/img/bannerMerc1.jpg' },
    { src: '/assets/img/sale.jpg' },

  ];

  produtosDestaq: any = []
  produtosPromocoes: any = []
  todosProdutos: any = []

  linhaAtual: number = 0;
  intervalo: any = undefined;

  constructor(public dialog: MatDialog, public crud: CrudService, private snake: MatSnackBar) { }

  ngOnInit(): void {
    this.iniciarIntervalo()
    this.produtos()
  }

  produtos() {
    this.crud.produtos.read().subscribe((res: any) => {
      res.map((v: any) => {
        this.todosProdutos.push(v)
        if (v.promocao == 1) {
          this.produtosPromocoes.push(v)
        } else if (v.promocao == 0) {
          this.produtosDestaq.push(v)
        }
      })
    })
  }

  resetarIntervalo() {
    clearInterval(this.intervalo);
  }

  iniciarIntervalo() {
    this.intervalo = setInterval(() => {
      this.nextImg(1)
    }, 4000);
  }

  nextImg(tipo: number) {
    if (tipo === 1) {
      if (this.linhaAtual === this.imagens.length - 1) {
        this.linhaAtual = 0
      } else {
        this.linhaAtual++
      }
    }

    if (tipo === 2) {
      this.resetarIntervalo()
      if (this.linhaAtual === this.imagens.length - 1) {
        this.linhaAtual = 0
      } else {
        this.linhaAtual++
      }
      this.iniciarIntervalo()
    }
  }

  previousImg() {
    this.resetarIntervalo()
    if (this.linhaAtual <= this.imagens.length - 1) {
      this.linhaAtual--
    }
    if (this.linhaAtual < 0) {
      this.linhaAtual = this.imagens.length - 1
    }
    this.iniciarIntervalo()
  }

  abrirModal(index: number, tipo: number) {
    this.produtosDestaq.tipo = tipo
    this.modal(index, tipo)
  }

  modal(index: number, tipo: number) {
    if (tipo === 1) {
      this.dialog.open(ModalTab1, {
        width: '100vw',
        height: '420px',
        data: { dados: this.produtosDestaq[index], tipoModal: tipo },
        exitAnimationDuration: 0,
        enterAnimationDuration: 0,
      })

    } else if (tipo === 2) {
      const dialogRef = this.dialog.open(ModalTab1, {
        width: '100vw',
        height: '380px',
        data: {
          dados: this.produtosDestaq[index], tipoModal: tipo
        },
        exitAnimationDuration: 0,
        enterAnimationDuration: 0,
      })
      dialogRef.afterClosed().subscribe(res => {
        if (res === true) {
          this.snake.open('Produto adicionado no seu carrinho!', 'Fechar', {
            duration: 3000
          })
        }
      })
    }

  }
}

@Component({
  selector: 'tab1Modal',
  templateUrl: 'tab1Modal.html',
  styleUrls: ['tab1Modal.scss']
})

export class ModalTab1 implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalTab1>) { }

  produtos: any;
  qtdProd: number = 1

  ngOnInit(): void {
    this.lerProdutos()
  }

  aumentarQtd() {
    this.qtdProd++
  }

  diminuirQtd() {
    if (this.qtdProd > 1) {
      this.qtdProd--
    }
  }

  lerProdutos() {
    this.produtos = [this.data.dados]
    console.log('aaaa', this.produtos)
  }

  fecharModal() {
    this.dialogRef.close(false)
  }

  addCart() {
    this.dialogRef.close(true)
  }

}