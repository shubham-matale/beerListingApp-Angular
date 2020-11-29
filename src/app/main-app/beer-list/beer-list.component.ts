import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../services/common-service.service';
import axios from 'axios';
import { actualProductsListLocal , imageUrlLocal } from './data'

const instance = axios.create();

const headers = {
  'Content-Type': 'text/plain'
};

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})



export class BeerListComponent implements OnInit {

  constructor(
    private commonService : CommonServiceService
  ) { }
  loadingProducts = true;
  loadingImages=true;
  actualProductsList:any;
  productsListToDisplay=[];
  currentItems=[]
  imageLinks:any;
  searchText='';
  minPageIndex=0;
  maxPageIndex=20;
  currentPage = 1;
  ngOnInit(): void {
  this.getAllProducts()
    // this.actualProductsList = actualProductsListLocal;
  }

  getAllProducts(){
    /**
     While trying to implement the cors error is their as from backend request from other service is not allowed hence i have loaded the data from the local file only.
     */
    this.commonService.apiCall('get','https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json').subscribe(
      data=>{
        console.log(data)
        this.actualProductsList = data;
        this.productsListToDisplay = this.actualProductsList
        this.loadingProducts = false;
      },
        error => {
        console.log(error)
          this.actualProductsList = actualProductsListLocal;
          this.productsListToDisplay = this.actualProductsList
          this.loadingProducts = false;
        }
    );

    this.commonService.apiCall('get','https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json').subscribe(
      data=>{
        console.log(data)
        this.imageLinks = data;
        this.loadingImages  = false;
      },
      error => {
        console.log(error)
        this.imageLinks = imageUrlLocal;
        this.loadingImages  = false;
      }
    );


  }

  getImage(index){
    return this.imageLinks[index%5]['image']
  }

  searchProduct(event){
    console.log(event);
    if(this.searchText.length>=3){
      this.productsListToDisplay = [];
      this.productsListToDisplay = this.actualProductsList.filter((element,index)=>{
        if (element['name'].toLowerCase().includes(this.searchText.toLowerCase().trim())){
          return true;
        }
      });
    }
    console.log(this.productsListToDisplay)
  }

  paginate(){

  }

  nextPage(){
    if(this.currentPage<this.productsListToDisplay.length/20)
    {
      this.currentPage+=1;
      this.maxPageIndex=this.currentPage*20;
      this.minPageIndex = this.maxPageIndex-20;
    }
    console.log(this.maxPageIndex, this.minPageIndex)
  }

  previousPage() {
    if (this.currentPage >= 1) {
      this.currentPage -= 1;
      this.maxPageIndex = this.currentPage * 20;
      this.minPageIndex = this.maxPageIndex - 20;
    }
    console.log(this.maxPageIndex, this.minPageIndex)
  }



}
