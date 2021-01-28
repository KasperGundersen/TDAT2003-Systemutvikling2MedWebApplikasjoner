// @flow

let v1 = [1, 2, 3];
let v2 = [4, 5, 6];
console.log('\nOppgave 1');

console.log('2 + v1: ', v1.map(e => 2 + e));
console.log('2 * v1: ', v1.map(e => e * 2));
console.log('Gjennomsnitt v1: ', (v1.reduce((sum, e) => sum + e, 0))/v1.length);

// multipliserer et og et element fra to arr legger så alt sammen med reduce
function dotp(x,y) {
    function dotp_sum(a,b) { return a + b; }
    function dotp_times(a,i) { return x[i] * y[i]; }
    if (x.length != y.length)
        throw "can't find dot product: arrays have different lengths";
    return x.map(dotp_times).reduce(dotp_sum,0);
}
console.log('Skalarprodukt v1v2: ', dotp(v1,v2));

// Lager sammen to arr i en ny arr, deretter reducer jeg den nye arr til én verdi
var sum = v1.map(function (num, idx) {
    return num + 2*v2[idx];
  });

console.log('v1 + 2*v2: ', sum.reduce((sum, e) => sum + e, 0));

console.log('v1 som String: ', v1.map(function(t){
    return 'v1['+v1.indexOf(t)+'] = ' + t;
}));

/////// OPPGAVE 2///////
console.log('\nOppgave 2');

class Complex {
  real: number;
  imag: number;

  constructor(real: number, img: number) {
    this.real = real;
    this.imag = img;
  }
}

let v = [new Complex(2, 2), new Complex(1, 1)];

console.log('Elementene i v som String: ', v.map(function(comp){
    return comp.real + ' + ' + comp.imag + 'i';
}).join(","));

console.log('Absoluttverdi av v: ', v.map((e => Math.sqrt(e.real*e.real + e.imag*e.imag) )));



v.reduce((sum, e) => {
  console.log('Sum av v: ', 'real: ', sum.real + e.real, 'imag: ', sum.imag + e.imag);
} );



/////// OPPGAVE 3///////
console.log('\nOppgave 3');

let students = [{ name: 'Ola', grade: 'A' }, { name: 'Kari', grade: 'C' }, { name: 'Knut', grade: 'C' }];

//
console.log(
  "Student arr som strings: [" +
  students.reduce((print, e, i) =>
  print + e.name + ' got '+ e.grade + ((i==students.length)?']':', '), ""
));

// Filtrerer alle fikk C og så sjeker lengden, for å finne hvor mange
console.log('Hvor mange fikk C: ', students.filter(e => e.grade == 'C').length);

console.log('Prosentandel av C: ', (students.filter(e => e.grade == 'C').length)/(students.map(e => e.grade).length));

console.log('Fikk noen A? ', students.some(e => e.grade == 'A')?"Yes":"No");

console.log('Fikk noen F? ', students.some(e => e.grade == 'F')?"Yes":"No");


