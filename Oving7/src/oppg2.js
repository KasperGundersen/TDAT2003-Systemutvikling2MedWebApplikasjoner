
//////// OPPGAVE 2///////
// @flow


class Complex {
    real: number;
    imag: number;
  
    constructor(real: number, img: number) {
      this.real = real;
      this.imag = img;
    }
  }
  
  let v = [new Complex(2, 2), new Complex(1, 1)];



  /*
  console.log('Elementene i v som String: ', v.map(function(comp){
      return comp.real + ' + ' + comp.real + 'i';
  }).join(","));
  */