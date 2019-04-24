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
    equal = $('#equal'),
    nums = $('.num'),
    ops = $('.ops'),
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

  // When: Number is clicked. Get the current number selected
  let setNums = function() {
    if (resultNum) {
      // If a result was displayed, reset number
      theNum = this.getAttribute('data-num');
      resultNum = '';
    } else {
      theNum += this.getAttribute('data-num');
    }
    viewer.innerHTML = theNum; // Display current number
  };

  let clearAll = function() {
    theNum = '';
    oldNum = '';
    viewer.innerHTML = '0';
  };

  let displayNum = function() {
    // Convert string input to numbers
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

      // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = theNum;
    }

    if (!isFinite(resultNum)) {
      resultNum = 'Error';
    }

    viewer.innerHTML = resultNum;

    oldNum = 0;
    theNum = resultNum;
    operator = null;
  };

  /* The click events */
  // Add click event to operators
  for (let i = 0; i < ops.length; i += 1) {
    ops[i].onclick = setOps;
  }
  // Add click event to numbers
  for (let i = 0; i < nums.length; i += 1) {
    nums[i].onclick = setNums;
  }
  // Add click event to equal sign
  clear.onclick = clearAll;

  equal.onclick = displayNum;
})();
