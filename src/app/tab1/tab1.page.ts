import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from '../serviços/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Storage } from '@ionic/storage-angular';

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
  produtosPromocoes: any = [
    { icon: '/assets/imgProduto/leite.jpg', preco: '5,90', nome: 'Leite piracanjuba 1L' },
    { icon: '/assets/imgProduto/Acucar.jpg', preco: '4,90', nome: 'Açucar união 1kg' },
    { icon: '/assets/imgProduto/po-de-cafe.jpg', preco: '19,90', nome: 'Pó de café 500g' },
    { icon: '/assets/imgProduto/banana.png', preco: '3,90', nome: 'Banana prata' },
  ]

  produtosDestaq: any = [
    { icon: '/assets/imgProduto/po-de-cafe.jpg', preco: '19,90', nome: 'Pó de café 500g' },
    { icon: '/assets/imgProduto/banana.png', preco: '3,90', nome: 'Banana prata' },
    { icon: '/assets/imgProduto/Acucar.jpg', preco: '4,90', nome: 'Açucar união 1kg' },
    { icon: '/assets/imgProduto/leite.jpg', preco: '5,90', nome: 'Leite piracanjuba 1L' }, 
  ]

  todosProdutos: any = []

  linhaAtual: number = 0;
  intervalo: any = undefined;
  itensCarrinho: any = 0
  loaded = false

  constructor(public dialog: MatDialog, public crud: CrudService, private snake: MatSnackBar, private storage: Storage) { }

  async ngOnInit() {
    this.iniciarIntervalo()
    await this.produtos()
    await this.getItens()
  }

  async produtos() {
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
      dialogRef.afterClosed().subscribe(async res => {
        if (res === true) {
          await this.getItens()
          this.snake.open('Produto adicionado no seu carrinho!', 'Fechar', {
            duration: 3000
          })
        }
      })
    }

  }


  async getItens() {
    /// pegando todos os itens do localStorage
    await this.storage.create();
    let totalItens = (await this.storage.keys()).length
    let value: any = []

    for (let i = 1; i <= totalItens; i++) {
      this.storage.get(i.toString()).then(v => {
        value.push(v)
      })
      this.itensCarrinho = i
    }
  }

}

@Component({
  selector: 'tab1Modal',
  templateUrl: 'tab1Modal.html',
  styleUrls: ['tab1Modal.scss']
})

export class ModalTab1 implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalTab1>, private crud: CrudService, private storage: Storage) { }

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

  async lerProdutos() {
    this.produtos = [this.data.dados]
  }

  fecharModal() {
    this.dialogRef.close(false)
  }

  async addCart() {
    /// criando itens no localStorage
    await this.storage.create();
    let contador = (await this.storage.keys()).length + 1
    this.storage.set(contador.toString(), this.produtos)
    this.dialogRef.close(true)
  }


}