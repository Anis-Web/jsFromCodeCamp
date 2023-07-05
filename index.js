/*
Return true if the given string is a palindrome. Otherwise, return false.

A palindrome is a word or sentence that's spelled the same way both forward and backward, 
ignoring punctuation, case, and spacing.

Note: You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and 
turn everything into the same case (lower or upper case) in order to check for palindromes.

We'll pass strings with varying formats, such as racecar, RaceCar, and race CAR among others.

We'll also pass strings with special symbols, such as 2A3*3a2, 2A3 3a2, and 2_A3*3#A2.

*/

function palindromeChecker(str){
  let regExp = /[a-z0-9]/g
  let newStr = str.toLowerCase().match(regExp).join('')
  let l = newStr.length
  let arrStart = []
  let arrEnd = []
  if(l % 2 == 0){
    for(let i = 0; i < l/2; i++){
      arrStart.push(newStr[i])
    }
    for(let i = l/2; i < l; i++){
      arrEnd.push(newStr[i])
    }
  } else{
    for(let i = 0; i < (l-1)/2; i++){
      arrStart.push(newStr[i])
    }
    for(let i = (l+1)/2; i < l; i++){
      arrEnd.push(newStr[i])
    }
  }
  arrEnd = arrEnd.reverse()
  let re = 0;
  for(let i = 0; i < arrStart.length; i++){
    arrStart[i] === arrEnd[i] ? re+= 1 : re+= -1
  }
  return re == arrStart.length;
}
console.log(palindromeChecker("A man, a plan, a canal. Panama"))
/*
convert to roman nomerals
*/
function convertToRoman(num) {
  var roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };
  var str = '';

  for (var i of Object.keys(roman)) {
    var q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }

  return str;
}

/*
"A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string."
*/
function cipherRot13(str) {
  str = str.toUpperCase();
  return str.replace(/[A-Z]/g, rot13);

  function rot13(correspondance) {
    const charCode = correspondance.charCodeAt();
    return String.fromCharCode(
            ((charCode + 13) <= 90) ? charCode + 13
                                    : (charCode + 13) % 90 + 64
           );
    
  }
}

/*
Telephone Number Validator
555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555
*/
function telephoneCheck(str) {
  let regExp = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
  return regExp.test(str);
}

/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, 
or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change 
if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, 
with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]

*/
var denom = [
	{ name: 'ONE HUNDRED', val: 100},
	{ name: 'TWENTY', val: 20},
	{ name: 'TEN', val: 10},
	{ name: 'FIVE', val: 5},
	{ name: 'ONE', val: 1},
	{ name: 'QUARTER', val: 0.25},
	{ name: 'DIME', val: 0.1},
	{ name: 'NICKEL', val: 0.05},
	{ name: 'PENNY', val: 0.01}
];

function checkCashRegister(price, cash, cid) {
 var output = {status: null, change: []};
 var change = cash - price;
 var register = cid.reduce(function(acc, curr) {
 acc.total += curr[1];
 acc[curr[0]] = curr[1];
 return acc;
 }, {total: 0});
 if(register.total === change) {
 output.status = 'CLOSED';
 output.change = cid;
 return output;
 }
 if(register.total < change) {
 output.status = 'INSUFFICIENT_FUNDS';
 return output;
 }
 var change_arr = denom.reduce(function(acc, curr) {
 var value = 0;
 while(register[curr.name] > 0 && change >= curr.val) {
 change -= curr.val;
 register[curr.name] -= curr.val;
 value += curr.val;
 change = Math.round(change * 100) / 100;
 }
 if(value > 0) {
 acc.push([ curr.name, value ]);
 }
 return acc;
 }, []);
 if(change_arr.length < 1 || change > 0) {
 output.status = 'INSUFFICIENT_FUNDS';
 return output;
 }
 output.status = 'OPEN';
 output.change = change_arr;
 return output;
}