(function() {
  'use strict';

  let $ = function(element) {
    if (element.charAt(0) === '#') {
      // ID passed? -> returns single element
      return document.querySelector(element);
    }

    return document.querySelectorAll(element); //returns a nodelist
  };

  let viewer = $('#viewer'), // display of result
    equal = $('#equal'), // Equal button
    nums = $('.num'), // List of numbers
    ops = $('.ops'), // List of operators
    clear = $('#clear'),
    theNum = '', // Current number
    oldNum = '', // First number
    resultNum, // Result
    operator;

  let setOps = function() {
    if (!operator) {
      oldNum = theNum;
      theNum = '';
      operator = this.getAttribute('data-ops');
    }
  };

  let setNums = function() {
    theNum += this.getAttribute('data-num');

    viewer.innerHTML = theNum;
  };

  let clearAll = function() {
    theNum = '';
    oldNum = '';
    viewer.innerHTML = '0';
  };

  let displayNum = function() {
    console.log('displayNum()');

    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    switch (operator) {
      case 'plus':
        resultNum = oldNum + theNum;
        break;

      case 'minus':
        resultNum = oldNum - theNum;
        break;

      case 'times':
        resultNum = oldNum * theNum;
        break;

      case 'devided by':
        resultNum = oldNum / theNum;
        break;

      default:
        resultNum = theNum;
    }

    if (!isFinite(resultNum)) {
      resultNum = 'Ошибка';
    }

    viewer.innerHTML = resultNum;

    oldNum = 0;
    theNum = resultNum;
    operator = null;
  };

  for (let i = 0; i < ops.length; i += 1) {
    ops[i].onclick = setOps;
  }

  for (let i = 0; i < nums.length; i += 1) {
    nums[i].onclick = setNums;
  }

  clear.onclick = clearAll;

  equal.onclick = displayNum;
})();
