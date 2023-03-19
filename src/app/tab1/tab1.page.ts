import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  produtosDestaq: any = [
    { destaque: '/assets/imgProduto/arroz.jpg', preco: '29,90', nome: 'Arroz tio joao 10kg', marca: 'Tio João', qtd: '10Kg', disponivel: '20' },
    { destaque: '/assets/imgProduto/po-de-cafe.jpg', preco: '19,90', nome: 'Pó de café 500g', marca: 'União', qtd: '500g', disponivel: '20' },
    { destaque: '/assets/imgProduto/banana.png', preco: '3,90', nome: 'Banana prata', marca: 'Prata', qtd: '1', disponivel: '20' },
    { destaque: '/assets/imgProduto/leite.jpg', preco: '5,90', nome: 'Leite piracanjuba 1L', marca: 'Piracanjuba', qtd: '1L', disponivel: '20' },
    { destaque: '/assets/imgProduto/Acucar.jpg', preco: '4,90', nome: 'Açucar união 1kg', marca: 'União', qtd: '1Kg', disponivel: '20' },
  ]

  produtosPromocoes: any = [
    { promocoes: '/assets/imgProduto/leite.jpg', preco: '5,90', nome: 'Leite piracanjuba 1L' },
    { promocoes: '/assets/imgProduto/banana.png', preco: '3,90', nome: 'Banana prata' },
    { promocoes: '/assets/imgProduto/Acucar.jpg', preco: '4,90', nome: 'Açucar união 1kg' },
    { promocoes: '/assets/imgProduto/po-de-cafe.jpg', preco: '19,90', nome: 'Pó de café 500g' },
    { promocoes: '/assets/imgProduto/banana.png', preco: '3,90', nome: 'Banana prata' },
  ]




  linhaAtual: number = 0;
  intervalo: any = undefined;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    console.log(this.produtosDestaq)

    this.iniciarIntervalo()

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
      this.dialog.open(ModalTab1, {
        width: '100vw',
        height: '200px',
        data: { dados: this.produtosDestaq[index], tipoModal: tipo },
        exitAnimationDuration: 0,
        enterAnimationDuration: 0,
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalTab1>) {

  }

  produtos: any;

  ngOnInit(): void {
    this.lerProdutos()
  }

  lerProdutos() {
    this.produtos = [this.data.dados]
    console.log(this.data)
  }

  fecharModal() {
    this.dialogRef.close()
  }

}