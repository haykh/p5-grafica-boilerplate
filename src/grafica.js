import p5 from 'p5';

class GPoint {
  constructor(...args) {
    var x, y, label;

    if (args.length === 3) {
      x = args[0];
      y = args[1];
      label = args[2];
    } else if (args.length === 2 && args[0] instanceof p5.Vector) {
      x = args[0].x;
      y = args[0].y;
      label = args[1];
    } else if (args.length === 2) {
      x = args[0];
      y = args[1];
      label = "";
    } else if (args.length === 1 && args[0] instanceof GPoint) {
      x = args[0].getX();
      y = args[0].getY();
      label = args[0].getLabel();
    } else if (args.length === 1 && args[0] instanceof p5.Vector) {
      x = args[0].x;
      y = args[0].y;
      label = "";
    } else if (args.length === 0) {
      x = 0;
      y = 0;
      label = "";
    } else {
      throw new Error("GPoint constructor: signature not supported");
    }
    this.x = x;
    this.y = y;
    this.label = label;
    this.valid = this.isValidNumber(this.x) && this.isValidNumber(this.y);
  }
};

GPoint.prototype.isValidNumber = function (number) {
  return !isNaN(number) && isFinite(number);
};

GPoint.prototype.set = function (...args) {
  var x, y, label;

  if (args.length === 3) {
    x = args[0];
    y = args[1];
    label = args[2];
  } else if (args.length === 2 && args[0] instanceof p5.Vector) {
    x = args[0].x;
    y = args[0].y;
    label = args[1];
  } else if (args.length === 2) {
    x = args[0];
    y = args[1];
    label = "";
  } else if (args.length === 1 && args[0] instanceof GPoint) {
    x = args[0].getX();
    y = args[0].getY();
    label = args[0].getLabel();
  } else if (args.length === 1 && args[0] instanceof p5.Vector) {
    x = args[0].x;
    y = args[0].y;
    label = "";
  } else {
    throw new Error("GPoint.set(): signature not supported");
  }

  this.x = x;
  this.y = y;
  this.label = label;
  this.valid = this.isValidNumber(this.x) && this.isValidNumber(this.y);
};

GPoint.prototype.setX = function (x) {
  this.x = x;
  this.valid = this.isValidNumber(this.x) && this.isValidNumber(this.y);
};

GPoint.prototype.setY = function (y) {
  this.y = y;
  this.valid = this.isValidNumber(this.x) && this.isValidNumber(this.y);
};

GPoint.prototype.setLabel = function (label) {
  this.label = label;
};

GPoint.prototype.setXY = function (...args) {
  var x, y;

  if (args.length === 2) {
    x = args[0];
    y = args[1];
  } else if (args.length === 1 && args[0] instanceof GPoint) {
    x = args[0].getX();
    y = args[0].getY();
  } else if (args.length === 1 && args[0] instanceof p5.Vector) {
    x = args[0].x;
    y = args[0].y;
  } else {
    throw new Error("GPoint.setXY(): signature not supported");
  }

  this.x = x;
  this.y = y;
  this.valid = this.isValidNumber(this.x) && this.isValidNumber(this.y);
};

GPoint.prototype.getX = function () {
  return this.x;
};

GPoint.prototype.getY = function () {
  return this.y;
};

GPoint.prototype.getLabel = function () {
  return this.label;
};

GPoint.prototype.getValid = function () {
  return this.valid;
};

GPoint.prototype.isValid = function () {
  return this.valid;
};
/*
 * Title class.
 */
class GTitle {
  constructor(parent, dim) {
    // The parent processing object
    this.parent = parent;

    // General properties
    this.dim = dim.slice();
    this.relativePos = 0.5;
    this.plotPos = this.relativePos * this.dim[0];
    this.offset = 10;

    // Text properties
    this.text = "";
    this.textAlignment = this.parent.CENTER;
    this.fontName = "Helvetica";
    this.fontColor = this.parent.color(100);
    this.fontStyle = this.parent.BOLD;
    this.fontSize = 13;
  }
};

GTitle.prototype.draw = function () {
  this.parent.push();
  this.parent.textFont(this.fontName);
  this.parent.textStyle(this.fontStyle);
  this.parent.textSize(this.fontSize);
  this.parent.fill(this.fontColor);
  this.parent.noStroke();
  this.parent.textAlign(this.textAlignment, this.parent.BOTTOM);
  this.parent.text(this.text, this.plotPos, -this.offset - this.dim[1]);

  // There seems to be a bug in p5.js
  this.parent.textStyle(this.parent.NORMAL);
  this.parent.pop();
};

GTitle.prototype.setDim = function (...args) {
  var xDim, yDim;

  if (args.length === 2) {
    xDim = args[0];
    yDim = args[1];
  } else if (args.length === 1) {
    xDim = args[0][0];
    yDim = args[0][1];
  } else {
    throw new Error("GTitle.setDim(): signature not supported");
  }

  if (xDim > 0 && yDim > 0) {
    this.dim[0] = xDim;
    this.dim[1] = yDim;
    this.plotPos = this.relativePos * this.dim[0];
  }
};

GTitle.prototype.setRelativePos = function (relativePos) {
  this.relativePos = relativePos;
  this.plotPos = this.relativePos * this.dim[0];
};

GTitle.prototype.setOffset = function (offset) {
  this.offset = offset;
};

GTitle.prototype.setText = function (text) {
  this.text = text;
};

GTitle.prototype.setTextAlignment = function (textAlignment) {
  if (textAlignment === this.parent.CENTER || textAlignment === this.parent.LEFT || textAlignment === this.parent.RIGHT) {
    this.textAlignment = textAlignment;
  }
};

GTitle.prototype.setFontName = function (fontName) {
  this.fontName = fontName;
};

GTitle.prototype.setFontColor = function (fontColor) {
  this.fontColor = fontColor;
};

GTitle.prototype.setFontStyle = function (fontStyle) {
  this.fontStyle = fontStyle;
};

GTitle.prototype.setFontSize = function (fontSize) {
  if (fontSize > 0) {
    this.fontSize = fontSize;
  }
};

GTitle.prototype.setFontProperties = function (fontName, fontColor, fontSize) {
  if (fontSize > 0) {
    this.fontName = fontName;
    this.fontColor = fontColor;
    this.fontSize = fontSize;
  }
};
/*
 * Axis label class.
 */
class GAxisLabel {
  constructor(parent, type, dim) {
    // The parent processing object
    this.parent = parent;

    // General properties
    this.type = (type === this.parent.BOTTOM || type === this.parent.TOP || type === this.parent.LEFT || type === this.parent.RIGHT) ? type : this.parent.BOTTOM;
    this.dim = dim.slice();
    this.relativePos = 0.5;
    this.plotPos = (this.type === this.parent.BOTTOM || this.type === this.parent.TOP) ? this.relativePos * this.dim[0] : -this.relativePos * this.dim[1];
    this.offset = 35;
    this.rotate = (this.type === this.parent.BOTTOM || this.type === this.parent.TOP) ? false : true;

    // Text properties
    this.text = "";
    this.textAlignment = this.parent.CENTER;
    this.fontName = "Helvetica";
    this.fontColor = this.parent.color(0);
    this.fontSize = 13;
  }
};

GAxisLabel.prototype.draw = function () {
  switch (this.type) {
    case this.parent.BOTTOM:
      this.drawAsXLabel();
      break;
    case this.parent.LEFT:
      this.drawAsYLabel();
      break;
    case this.parent.TOP:
      this.drawAsTopLabel();
      break;
    case this.parent.RIGHT:
      this.drawAsRightLabel();
      break;
  }
};

GAxisLabel.prototype.drawAsXLabel = function () {
  this.parent.push();
  this.parent.textFont(this.fontName);
  this.parent.textSize(this.fontSize);
  this.parent.fill(this.fontColor);
  this.parent.noStroke();

  if (this.rotate) {
    this.parent.textAlign(this.parent.RIGHT, this.parent.CENTER);
    this.parent.translate(this.plotPos, this.offset);
    this.parent.rotate(-0.5 * Math.PI);
    this.parent.text(this.text, 0, 0);
  } else {
    this.parent.textAlign(this.textAlignment, this.parent.TOP);
    this.parent.text(this.text, this.plotPos, this.offset);
  }

  this.parent.pop();
};

GAxisLabel.prototype.drawAsYLabel = function () {
  this.parent.push();
  this.parent.textFont(this.fontName);
  this.parent.textSize(this.fontSize);
  this.parent.fill(this.fontColor);
  this.parent.noStroke();

  if (this.rotate) {
    this.parent.textAlign(this.textAlignment, this.parent.BOTTOM);
    this.parent.translate(-this.offset, this.plotPos);
    this.parent.rotate(-0.5 * Math.PI);
    this.parent.text(this.text, 0, 0);
  } else {
    this.parent.textAlign(this.parent.RIGHT, this.parent.CENTER);
    this.parent.text(this.text, -this.offset, this.plotPos);
  }

  this.parent.pop();
};

GAxisLabel.prototype.drawAsTopLabel = function () {
  this.parent.push();
  this.parent.textFont(this.fontName);
  this.parent.textSize(this.fontSize);
  this.parent.fill(this.fontColor);
  this.parent.noStroke();

  if (this.rotate) {
    this.parent.textAlign(this.parent.LEFT, this.parent.CENTER);
    this.parent.translate(this.plotPos, -this.offset - this.dim[1]);
    this.parent.rotate(-0.5 * Math.PI);
    this.parent.text(this.text, 0, 0);
  } else {
    this.parent.textAlign(this.textAlignment, this.parent.BOTTOM);
    this.parent.text(this.text, this.plotPos, -this.offset - this.dim[1]);
  }

  this.parent.pop();
};

GAxisLabel.prototype.drawAsRightLabel = function () {
  this.parent.push();
  this.parent.textFont(this.fontName);
  this.parent.textSize(this.fontSize);
  this.parent.fill(this.fontColor);
  this.parent.noStroke();

  if (this.rotate) {
    this.parent.textAlign(this.textAlignment, this.parent.TOP);
    this.parent.translate(this.offset + this.dim[0], this.plotPos);
    this.parent.rotate(-0.5 * Math.PI);
    this.parent.text(this.text, 0, 0);
  } else {
    this.parent.textAlign(this.parent.LEFT, this.parent.CENTER);
    this.parent.text(this.text, this.offset + this.dim[0], this.plotPos);
  }

  this.parent.pop();
};

GAxisLabel.prototype.setDim = function (...args) {
  var xDim, yDim;

  if (args.length === 2) {
    xDim = args[0];
    yDim = args[1];
  } else if (args.length === 1) {
    xDim = args[0][0];
    yDim = args[0][1];
  } else {
    throw new Error("GAxisLabel.setDim(): signature not supported");
  }

  if (xDim > 0 && yDim > 0) {
    this.dim[0] = xDim;
    this.dim[1] = yDim;
    this.plotPos = (this.type === this.parent.BOTTOM || this.type === this.parent.TOP) ? this.relativePos * this.dim[0] : -this.relativePos * this.dim[1];
  }
};

GAxisLabel.prototype.setRelativePos = function (relativePos) {
  this.relativePos = relativePos;
  this.plotPos = (this.type === this.parent.BOTTOM || this.type === this.parent.TOP) ? this.relativePos * this.dim[0] : -this.relativePos * this.dim[1];
};

GAxisLabel.prototype.setOffset = function (offset) {
  this.offset = offset;
};

GAxisLabel.prototype.setRotate = function (rotate) {
  this.rotate = rotate;
};

GAxisLabel.prototype.setText = function (text) {
  this.text = text;
};

GAxisLabel.prototype.setTextAlignment = function (textAlignment) {
  if (textAlignment === this.parent.CENTER || textAlignment === this.parent.LEFT || textAlignment === this.parent.RIGHT) {
    this.textAlignment = textAlignment;
  }
};

GAxisLabel.prototype.setFontName = function (fontName) {
  this.fontName = fontName;
};

GAxisLabel.prototype.setFontColor = function (fontColor) {
  this.fontColor = fontColor;
};

GAxisLabel.prototype.setFontSize = function (fontSize) {
  if (fontSize > 0) {
    this.fontSize = fontSize;
  }
};

GAxisLabel.prototype.setFontProperties = function (fontName, fontColor, fontSize) {
  if (fontSize > 0) {
    this.fontName = fontName;
    this.fontColor = fontColor;
    this.fontSize = fontSize;
  }
};
/*
 * Axis class. 
 */
class GAxis {
  constructor(parent, type, dim, lim, log) {
    // The parent processing object
    this.parent = parent;

    // General properties
    this.type = (type === this.parent.BOTTOM || type === this.parent.TOP || type === this.parent.LEFT || type === this.parent.RIGHT) ? type : this.parent.BOTTOM;
    this.dim = dim.slice();
    this.lim = lim.slice();
    this.log = log;

    // Do some sanity checks
    if (this.log && (this.lim[0] <= 0 || this.lim[1] <= 0)) {
      console.log("The limits are negative. This is not allowed in logarithmic scale.");
      console.log("Will set them to (0.1, 10)");

      if (this.lim[1] > this.lim[0]) {
        this.lim[0] = 0.1;
        this.lim[1] = 10;
      } else {
        this.lim[0] = 10;
        this.lim[1] = 0.1;
      }
    }

    // Format properties
    this.offset = 5;
    this.lineColor = this.parent.color(0);
    this.lineWidth = 1;

    // Ticks properties
    this.nTicks = 5;
    this.ticksSeparation = -1;
    this.ticks = [];
    this.plotTicks = [];
    this.ticksInside = [];
    this.tickLabels = [];
    this.fixedTicks = false;
    this.tickLength = 3;
    this.smallTickLength = 2;
    this.expTickLabels = false;
    this.rotateTickLabels = (this.type === this.parent.BOTTOM || this.type === this.parent.TOP) ? false : true;
    this.drawTickLabels = (this.type === this.parent.BOTTOM || this.type === this.parent.LEFT) ? true : false;
    this.tickLabelOffset = 7;
    this.ticksPrecision = undefined;

    // Label properties
    this.lab = new GAxisLabel(this.parent, this.type, this.dim);
    this.drawAxisLabel = true;

    // Text properties
    this.fontName = "Helvetica";
    this.fontColor = this.parent.color(0);
    this.fontSize = 11;

    // Update the arrays
    this.updateTicks();
    this.updatePlotTicks();
    this.updateTicksInside();
    this.updateTickLabels();
  }
};

GAxis.prototype.obtainSigDigits = function (number) {
  return Math.round(-Math.log(0.5 * Math.abs(number)) / Math.LN10);
};

GAxis.prototype.roundPlus = function (number, sigDigits) {
  // Old way of doing it
  // var bd = new BigDecimal(number);
  // roundedNumber = parseFloat(bd.setScale(sigDigits, RoundingMode.HALF_UP()).longValue().toFixed(sigDigits));

  number = Math.round(number * Math.pow(10, sigDigits)) / Math.pow(10, sigDigits);

  if (sigDigits <= 0) {
    number = Math.round(number);
  }

  return number;
};

GAxis.prototype.adaptSize = function (a, n) {
  if (n < a.length) {
    a.splice(n, Number.MAX_VALUE);
  }
};

GAxis.prototype.updateTicks = function () {
  if (this.log) {
    this.obtainLogarithmicTicks();
  } else {
    this.obtainLinearTicks();
  }
};

GAxis.prototype.obtainLogarithmicTicks = function () {
  // Get the exponents of the first and last ticks in increasing order
  var firstExp, lastExp;

  if (this.lim[1] > this.lim[0]) {
    firstExp = Math.floor(Math.log(this.lim[0]) / Math.LN10);
    lastExp = Math.ceil(Math.log(this.lim[1]) / Math.LN10);
  } else {
    firstExp = Math.floor(Math.log(this.lim[1]) / Math.LN10);
    lastExp = Math.ceil(Math.log(this.lim[0]) / Math.LN10);
  }

  // Calculate the ticks
  var n = (lastExp - firstExp) * 9 + 1;
  this.adaptSize(this.ticks, n);

  for (var exp = firstExp; exp < lastExp; exp++) {
    var base = this.roundPlus(Math.exp(exp * Math.LN10), -exp);

    for (var i = 0; i < 9; i++) {
      this.ticks[(exp - firstExp) * 9 + i] = (i + 1) * base;
    }

  }

  this.ticks[this.ticks.length - 1] = this.roundPlus(Math.exp(lastExp * Math.LN10), -exp);

  // Change the ticks order if necessary
  if (this.lim[1] < this.lim[0]) {
    this.ticks.reverse();
  }
};

GAxis.prototype.obtainLinearTicks = function () {
  // Obtain the required precision for the ticks
  var step = 0;
  var nSteps = 0;
  var sigDigits = 0;

  if (this.ticksSeparation > 0) {
    step = (this.lim[1] > this.lim[0]) ? this.ticksSeparation : -this.ticksSeparation;
    sigDigits = this.obtainSigDigits(step);

    while (this.roundPlus(step, sigDigits) - step !== 0) {
      sigDigits++;
    }

    nSteps = Math.floor((this.lim[1] - this.lim[0]) / step);
  } else if (this.nTicks > 0) {
    step = (this.lim[1] - this.lim[0]) / this.nTicks;
    sigDigits = this.obtainSigDigits(step);
    step = this.roundPlus(step, sigDigits);

    if (step === 0 || Math.abs(step) > Math.abs(this.lim[1] - this.lim[0])) {
      sigDigits++;
      step = this.roundPlus((this.lim[1] - this.lim[0]) / this.nTicks, sigDigits);
    }

    nSteps = Math.floor((this.lim[1] - this.lim[0]) / step);
  }

  // Calculate the linear ticks
  if (nSteps > 0) {
    // Obtain the first tick
    var firstTick = this.lim[0] + ((this.lim[1] - this.lim[0]) - nSteps * step) / 2;

    // Subtract some steps to be sure we have all
    firstTick = this.roundPlus(firstTick - 2 * step, sigDigits);

    while ((this.lim[1] - firstTick) * (this.lim[0] - firstTick) > 0) {
      firstTick = this.roundPlus(firstTick + step, sigDigits);
    }

    // Calculate the rest of the ticks
    var n = Math.floor(Math.abs((this.lim[1] - firstTick) / step)) + 1;
    this.adaptSize(this.ticks, n);
    this.ticks[0] = firstTick;

    for (var i = 1; i < n; i++) {
      this.ticks[i] = this.roundPlus(this.ticks[i - 1] + step, sigDigits);
    }

    // Save the ticks precision
    this.ticksPrecision = sigDigits;
  } else {
    this.ticks = [];
  }
};

GAxis.prototype.updatePlotTicks = function () {
  var scaleFactor, i;
  var n = this.ticks.length;
  this.adaptSize(this.plotTicks, n);

  if (this.log) {
    if (this.type === this.parent.BOTTOM || this.type === this.parent.TOP) {
      scaleFactor = this.dim[0] / Math.log(this.lim[1] / this.lim[0]);
    } else {
      scaleFactor = -this.dim[1] / Math.log(this.lim[1] / this.lim[0]);
    }

    for (i = 0; i < n; i++) {
      this.plotTicks[i] = Math.log(this.ticks[i] / this.lim[0]) * scaleFactor;
    }
  } else {
    if (this.type === this.parent.BOTTOM || this.type === this.parent.TOP) {
      scaleFactor = this.dim[0] / (this.lim[1] - this.lim[0]);
    } else {
      scaleFactor = -this.dim[1] / (this.lim[1] - this.lim[0]);
    }

    for (i = 0; i < n; i++) {
      this.plotTicks[i] = (this.ticks[i] - this.lim[0]) * scaleFactor;
    }
  }
};

GAxis.prototype.updateTicksInside = function () {
  var i;
  var n = this.ticks.length;
  this.adaptSize(this.ticksInside, n);

  if (this.type === this.parent.BOTTOM || this.type === this.parent.TOP) {
    for (i = 0; i < n; i++) {
      this.ticksInside[i] = (this.plotTicks[i] >= 0) && (this.plotTicks[i] <= this.dim[0]);
    }
  } else {
    for (i = 0; i < n; i++) {
      this.ticksInside[i] = (-this.plotTicks[i] >= 0) && (-this.plotTicks[i] <= this.dim[1]);
    }
  }
};

GAxis.prototype.updateTickLabels = function () {
  var tick, logValue, isExactLogValue, i;
  var n = this.ticks.length;
  this.adaptSize(this.tickLabels, n);

  if (this.log) {
    for (i = 0; i < n; i++) {
      tick = this.ticks[i];

      if (tick > 0) {
        logValue = Math.log(tick) / Math.LN10;
        isExactLogValue = Math.abs(logValue - Math.round(logValue)) < 0.0001;

        if (isExactLogValue) {
          logValue = Math.round(logValue);

          if (this.expTickLabels) {
            this.tickLabels[i] = "1e" + logValue;
          } else {
            if (logValue > -3.1 && logValue < 3.1) {
              this.tickLabels[i] = (logValue >= 0) ? "" + Math.round(tick) : "" + tick;
            } else {
              this.tickLabels[i] = "1e" + logValue;
            }
          }
        } else {
          this.tickLabels[i] = "";
        }
      } else {
        this.tickLabels[i] = "";
      }
    }
  } else {
    for (i = 0; i < n; i++) {
      tick = this.ticks[i];

      if (tick % 1 === 0) {
        this.tickLabels[i] = "" + Math.round(tick);
      } else if (typeof this.ticksPrecision !== "undefined" && this.ticksPrecision >= 0) {
        this.tickLabels[i] = "" + parseFloat(tick).toFixed(this.ticksPrecision);
      } else {
        this.tickLabels[i] = "" + tick;
      }
    }
  }
};

GAxis.prototype.moveLim = function (newLim) {
  if (newLim[1] !== newLim[0]) {
    // Check that the new limit makes sense
    if (this.log && (newLim[0] <= 0 || newLim[1] <= 0)) {
      console.log("The limits are negative. This is not allowed in logarithmic scale.");
    } else {
      this.lim[0] = newLim[0];
      this.lim[1] = newLim[1];

      // Calculate the new ticks if they are not fixed
      if (!this.fixedTicks) {
        var n = this.ticks.length;

        if (this.log) {
          this.obtainLogarithmicTicks();
        } else if (n > 0) {
          // Obtain the ticks precision and the tick separation
          var step = 0;
          var sigDigits = 0;

          if (this.ticksSeparation > 0) {
            step = (this.lim[1] > this.lim[0]) ? this.ticksSeparation : -this.ticksSeparation;
            sigDigits = this.obtainSigDigits(step);

            while (this.roundPlus(step, sigDigits) - step !== 0) {
              sigDigits++;
            }
          } else {
            step = (n === 1) ? this.lim[1] - this.lim[0] : this.ticks[1] - this.ticks[0];
            sigDigits = this.obtainSigDigits(step);
            step = this.roundPlus(step, sigDigits);

            if (step === 0 || Math.abs(step) > Math.abs(this.lim[1] - this.lim[0])) {
              sigDigits++;
              step = (n === 1) ? this.lim[1] - this.lim[0] : this.ticks[1] - this.ticks[0];
              step = this.roundPlus(step, sigDigits);
            }

            step = (this.lim[1] > this.lim[0]) ? Math.abs(step) : -Math.abs(step);
          }

          // Obtain the first tick
          var firstTick = this.ticks[0] + step * Math.ceil((this.lim[0] - this.ticks[0]) / step);
          firstTick = this.roundPlus(firstTick, sigDigits);

          if ((this.lim[1] - firstTick) * (this.lim[0] - firstTick) > 0) {
            firstTick = this.ticks[0] + step * Math.floor((this.lim[0] - this.ticks[0]) / step);
            firstTick = this.roundPlus(firstTick, sigDigits);
          }

          // Calculate the rest of the ticks
          n = Math.floor(Math.abs((this.lim[1] - firstTick) / step)) + 1;
          this.adaptSize(this.ticks, n);
          this.ticks[0] = firstTick;

          for (var i = 1; i < n; i++) {
            this.ticks[i] = this.roundPlus(this.ticks[i - 1] + step, sigDigits);
          }

          // A sanity check
          if (this.ticksPrecision !== sigDigits) {
            console.log("There is a problem in the axis ticks precision calculation");
          }
        }

        // Obtain the new tick labels
        this.updateTickLabels();
      }

      // Update the rest of the arrays
      this.updatePlotTicks();
      this.updateTicksInside();
    }
  }
};

GAxis.prototype.draw = function () {
  switch (this.type) {
    case this.parent.BOTTOM:
      this.drawAsXAxis();
      break;
    case this.parent.LEFT:
      this.drawAsYAxis();
      break;
    case this.parent.TOP:
      this.drawAsTopAxis();
      break;
    case this.parent.RIGHT:
      this.drawAsRightAxis();
      break;
  }

  if (this.drawAxisLabel) {
    this.lab.draw();
  }
};

GAxis.prototype.drawAsXAxis = function () {
  var i;

  // Draw the ticks
  this.parent.push();
  this.parent.stroke(this.lineColor);
  this.parent.strokeWeight(this.lineWidth);
  this.parent.strokeCap(this.parent.SQUARE);

  this.parent.line(0, this.offset, this.dim[0], this.offset);

  for (i = 0; i < this.plotTicks.length; i++) {
    if (this.ticksInside[i]) {
      if (this.log && this.tickLabels[i] === "") {
        this.parent.line(this.plotTicks[i], this.offset, this.plotTicks[i], this.offset + this.smallTickLength);
      } else {
        this.parent.line(this.plotTicks[i], this.offset, this.plotTicks[i], this.offset + this.tickLength);
      }
    }
  }

  this.parent.pop();

  // Draw the tick labels
  if (this.drawTickLabels) {
    this.parent.push();
    this.parent.textFont(this.fontName);
    this.parent.textSize(this.fontSize);
    this.parent.fill(this.fontColor);
    this.parent.noStroke();

    if (this.rotateTickLabels) {
      var halfPI = 0.5 * Math.PI;
      this.parent.textAlign(this.parent.RIGHT, this.parent.CENTER);

      for (i = 0; i < this.plotTicks.length; i++) {
        if (this.ticksInside[i] && this.tickLabels[i] !== "") {
          this.parent.push();
          this.parent.translate(this.plotTicks[i], this.offset + this.tickLabelOffset);
          this.parent.rotate(-halfPI);
          this.parent.text(this.tickLabels[i], 0, 0);
          this.parent.pop();
        }
      }
    } else {
      this.parent.textAlign(this.parent.CENTER, this.parent.TOP);

      for (i = 0; i < this.plotTicks.length; i++) {
        if (this.ticksInside[i] && this.tickLabels[i] !== "") {
          this.parent.text(this.tickLabels[i], this.plotTicks[i], this.offset + this.tickLabelOffset);
        }
      }
    }

    this.parent.pop();
  }
};

GAxis.prototype.drawAsYAxis = function () {
  var i;

  // Draw the ticks
  this.parent.push();
  this.parent.stroke(this.lineColor);
  this.parent.strokeWeight(this.lineWidth);
  this.parent.strokeCap(this.parent.SQUARE);

  this.parent.line(-this.offset, 0, -this.offset, -this.dim[1]);

  for (i = 0; i < this.plotTicks.length; i++) {
    if (this.ticksInside[i]) {
      if (this.log && this.tickLabels[i] === "") {
        this.parent.line(-this.offset, this.plotTicks[i], -this.offset - this.smallTickLength, this.plotTicks[i]);
      } else {
        this.parent.line(-this.offset, this.plotTicks[i], -this.offset - this.tickLength, this.plotTicks[i]);
      }
    }
  }

  this.parent.pop();

  // Draw the tick labels
  if (this.drawTickLabels) {
    this.parent.push();
    this.parent.textFont(this.fontName);
    this.parent.textSize(this.fontSize);
    this.parent.fill(this.fontColor);
    this.parent.noStroke();

    if (this.rotateTickLabels) {
      var halfPI = 0.5 * Math.PI;
      this.parent.textAlign(this.parent.CENTER, this.parent.BOTTOM);

      for (i = 0; i < this.plotTicks.length; i++) {
        if (this.ticksInside[i] && this.tickLabels[i] !== "") {
          this.parent.push();
          this.parent.translate(-this.offset - this.tickLabelOffset, this.plotTicks[i]);
          this.parent.rotate(-halfPI);
          this.parent.text(this.tickLabels[i], 0, 0);
          this.parent.pop();
        }
      }
    } else {
      this.parent.textAlign(this.parent.RIGHT, this.parent.CENTER);

      for (i = 0; i < this.plotTicks.length; i++) {
        if (this.ticksInside[i] && this.tickLabels[i] !== "") {
          this.parent.text(this.tickLabels[i], -this.offset - this.tickLabelOffset, this.plotTicks[i]);
        }
      }
    }

    this.parent.pop();
  }
};

GAxis.prototype.drawAsTopAxis = function () {
  var i;

  // Draw the ticks
  this.parent.push();
  this.parent.stroke(this.lineColor);
  this.parent.strokeWeight(this.lineWidth);
  this.parent.strokeCap(this.parent.SQUARE);
  this.parent.translate(0, -this.dim[1]);

  this.parent.line(0, -this.offset, this.dim[0], -this.offset);

  for (i = 0; i < this.plotTicks.length; i++) {
    if (this.ticksInside[i]) {
      if (this.log && this.tickLabels[i] === "") {
        this.parent.line(this.plotTicks[i], -this.offset, this.plotTicks[i], -this.offset - this.smallTickLength);
      } else {
        this.parent.line(this.plotTicks[i], -this.offset, this.plotTicks[i], -this.offset - this.tickLength);
      }
    }
  }

  this.parent.pop();

  // Draw the tick labels
  if (this.drawTickLabels) {
    this.parent.push();
    this.parent.textFont(this.fontName);
    this.parent.textSize(this.fontSize);
    this.parent.fill(this.fontColor);
    this.parent.noStroke();
    this.parent.translate(0, -this.dim[1]);

    if (this.rotateTickLabels) {
      var halfPI = 0.5 * Math.PI;
      this.parent.textAlign(this.parent.LEFT, this.parent.CENTER);

      for (i = 0; i < this.plotTicks.length; i++) {
        if (this.ticksInside[i] && this.tickLabels[i] !== "") {
          this.parent.push();
          this.parent.translate(this.plotTicks[i], -this.offset - this.tickLabelOffset);
          this.parent.rotate(-halfPI);
          this.parent.text(this.tickLabels[i], 0, 0);
          this.parent.pop();
        }
      }
    } else {
      this.parent.textAlign(this.parent.CENTER, this.parent.BOTTOM);

      for (i = 0; i < this.plotTicks.length; i++) {
        if (this.ticksInside[i] && this.tickLabels[i] !== "") {
          this.parent.text(this.tickLabels[i], this.plotTicks[i], -this.offset - this.tickLabelOffset);
        }
      }
    }

    this.parent.pop();
  }
};

GAxis.prototype.drawAsRightAxis = function () {
  var i;

  // Draw the ticks
  this.parent.push();
  this.parent.stroke(this.lineColor);
  this.parent.strokeWeight(this.lineWidth);
  this.parent.strokeCap(this.parent.SQUARE);
  this.parent.translate(this.dim[0], 0);

  this.parent.line(this.offset, 0, this.offset, -this.dim[1]);

  for (i = 0; i < this.plotTicks.length; i++) {
    if (this.ticksInside[i]) {
      if (this.log && this.tickLabels[i] === "") {
        this.parent.line(this.offset, this.plotTicks[i], this.offset + this.smallTickLength, this.plotTicks[i]);
      } else {
        this.parent.line(this.offset, this.plotTicks[i], this.offset + this.tickLength, this.plotTicks[i]);
      }
    }
  }

  this.parent.pop();

  // Draw the tick labels
  if (this.drawTickLabels) {
    this.parent.push();
    this.parent.textFont(this.fontName);
    this.parent.textSize(this.fontSize);
    this.parent.fill(this.fontColor);
    this.parent.noStroke();
    this.parent.translate(this.dim[0], 0);

    if (this.rotateTickLabels) {
      var halfPI = 0.5 * Math.PI;
      this.parent.textAlign(this.parent.CENTER, this.parent.TOP);

      for (i = 0; i < this.plotTicks.length; i++) {
        if (this.ticksInside[i] && this.tickLabels[i] !== "") {
          this.parent.push();
          this.parent.translate(this.offset + this.tickLabelOffset, this.plotTicks[i]);
          this.parent.rotate(-halfPI);
          this.parent.text(this.tickLabels[i], 0, 0);
          this.parent.pop();
        }
      }
    } else {
      this.parent.textAlign(this.parent.LEFT, this.parent.CENTER);

      for (i = 0; i < this.plotTicks.length; i++) {
        if (this.ticksInside[i] && this.tickLabels[i] !== "") {
          this.parent.text(this.tickLabels[i], this.offset + this.tickLabelOffset, this.plotTicks[i]);
        }
      }
    }

    this.parent.pop();
  }
};

GAxis.prototype.setDim = function (...args) {
  var xDim, yDim;

  if (args.length === 2) {
    xDim = args[0];
    yDim = args[1];
  } else if (args.length === 1) {
    xDim = args[0][0];
    yDim = args[0][1];
  } else {
    throw new Error("GAxis.setDim(): signature not supported");
  }

  if (xDim > 0 && yDim > 0) {
    this.dim[0] = xDim;
    this.dim[1] = yDim;
    this.updatePlotTicks();
    this.lab.setDim(this.dim);
  }
};

GAxis.prototype.setLim = function (lim) {
  if (lim[1] !== lim[0]) {
    // Make sure the new limits makes sense
    if (this.log && (lim[0] <= 0 || lim[1] <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
    } else {
      this.lim[0] = lim[0];
      this.lim[1] = lim[1];

      if (!this.fixedTicks) {
        this.updateTicks();
        this.updateTickLabels();
      }

      this.updatePlotTicks();
      this.updateTicksInside();
    }
  }
};

GAxis.prototype.setLimAndLog = function (lim, log) {
  if (lim[1] !== lim[0]) {
    // Make sure the new limits makes sense
    if (log && (lim[0] <= 0 || lim[1] <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
    } else {
      this.lim[0] = lim[0];
      this.lim[1] = lim[1];
      this.log = log;

      if (!this.fixedTicks) {
        this.updateTicks();
        this.updateTickLabels();
      }

      this.updatePlotTicks();
      this.updateTicksInside();
    }
  }
};

GAxis.prototype.setLog = function (log) {
  if (log !== this.log) {
    this.log = log;

    // Check if the old limits still make sense
    if (this.log && (this.lim[0] <= 0 || this.lim[1] <= 0)) {
      console.log("The limits are negative. This is not allowed in logarithmic scale.");
      console.log("Will set them to (0.1, 10)");

      if (this.lim[1] > this.lim[0]) {
        this.lim[0] = 0.1;
        this.lim[1] = 10;
      } else {
        this.lim[0] = 10;
        this.lim[1] = 0.1;
      }
    }

    if (!this.fixedTicks) {
      this.updateTicks();
      this.updateTickLabels();
    }

    this.updatePlotTicks();
    this.updateTicksInside();
  }
};

GAxis.prototype.setOffset = function (offset) {
  this.offset = offset;
};

GAxis.prototype.setLineColor = function (lineColor) {
  this.lineColor = lineColor;
};

GAxis.prototype.setLineWidth = function (lineWidth) {
  if (lineWidth > 0) {
    this.lineWidth = lineWidth;
  }
};

GAxis.prototype.setNTicks = function (nTicks) {
  if (nTicks >= 0) {
    this.nTicks = nTicks;
    this.ticksSeparation = -1;
    this.fixedTicks = false;

    if (!this.log) {
      this.updateTicks();
      this.updatePlotTicks();
      this.updateTicksInside();
      this.updateTickLabels();
    }
  }
};

GAxis.prototype.setTicksSeparation = function (ticksSeparation) {
  this.ticksSeparation = ticksSeparation;
  this.fixedTicks = false;

  if (!this.log) {
    this.updateTicks();
    this.updatePlotTicks();
    this.updateTicksInside();
    this.updateTickLabels();
  }
};

GAxis.prototype.setTicks = function (ticks) {
  var n = ticks.length;
  this.adaptSize(this.ticks, n);

  for (var i = 0; i < n; i++) {
    this.ticks[i] = ticks[i];
  }

  this.fixedTicks = true;

  // Set the tick precision to undefined
  this.ticksPrecision = undefined;

  this.updatePlotTicks();
  this.updateTicksInside();
  this.updateTickLabels();
};

GAxis.prototype.setTickLabels = function (tickLabels) {
  if (tickLabels.length === this.tickLabels.length) {
    for (var i = 0; i < this.tickLabels.length; i++) {
      this.tickLabels[i] = tickLabels[i];
    }

    this.fixedTicks = true;

    // Set the tick precision to undefined
    this.ticksPrecision = undefined;
  }
};

GAxis.prototype.setFixedTicks = function (fixedTicks) {
  if (fixedTicks !== this.fixedTicks) {
    this.fixedTicks = fixedTicks;

    if (!this.fixedTicks) {
      this.updateTicks();
      this.updatePlotTicks();
      this.updateTicksInside();
      this.updateTickLabels();
    }
  }
};

GAxis.prototype.setTickLength = function (tickLength) {
  this.tickLength = tickLength;
};

GAxis.prototype.setSmallTickLength = function (smallTickLength) {
  this.smallTickLength = smallTickLength;
};

GAxis.prototype.setExpTickLabels = function (expTickLabels) {
  if (expTickLabels !== this.expTickLabels) {
    this.expTickLabels = expTickLabels;
    this.updateTickLabels();
  }
};

GAxis.prototype.setRotateTickLabels = function (rotateTickLabels) {
  this.rotateTickLabels = rotateTickLabels;
};

GAxis.prototype.setDrawTickLabels = function (drawTickLabels) {
  this.drawTickLabels = drawTickLabels;
};

GAxis.prototype.setTickLabelOffset = function (tickLabelOffset) {
  this.tickLabelOffset = tickLabelOffset;
};

GAxis.prototype.setDrawAxisLabel = function (drawAxisLabel) {
  this.drawAxisLabel = drawAxisLabel;
};

GAxis.prototype.setAxisLabelText = function (axisLabelText) {
  this.lab.setText(axisLabelText);
};

GAxis.prototype.setFontName = function (fontName) {
  this.fontName = fontName;
};

GAxis.prototype.setFontColor = function (fontColor) {
  this.fontColor = fontColor;
};

GAxis.prototype.setFontSize = function (fontSize) {
  if (fontSize > 0) {
    this.fontSize = fontSize;
  }
};

GAxis.prototype.setFontProperties = function (fontName, fontColor, fontSize) {
  if (fontSize > 0) {
    this.fontName = fontName;
    this.fontColor = fontColor;
    this.fontSize = fontSize;
  }
};

GAxis.prototype.setAllFontProperties = function (fontName, fontColor, fontSize) {
  this.setFontProperties(fontName, fontColor, fontSize);
  this.lab.setFontProperties(fontName, fontColor, fontSize);
};

GAxis.prototype.getTicks = function () {
  if (this.fixedTicks) {
    return this.ticks.slice();
  } else {
    // Return only the ticks that are visible
    var validTicks = [];
    var counter = 0;

    for (var i = 0; i < this.ticksInside.length; i++) {
      if (this.ticksInside[i]) {
        validTicks[counter] = this.ticks[i];
        counter++;
      }
    }

    return validTicks;
  }
};

GAxis.prototype.getTicksRef = function () {
  return this.ticks;
};

GAxis.prototype.getPlotTicks = function () {
  if (this.fixedTicks) {
    return this.plotTicks.slice();
  } else {
    var validPlotTicks = [];
    var counter = 0;

    for (var i = 0; i < this.ticksInside.length; i++) {
      if (this.ticksInside[i]) {
        validPlotTicks[counter] = this.plotTicks[i];
        counter++;
      }
    }

    return validPlotTicks;
  }
};

GAxis.prototype.getPlotTicksRef = function () {
  return this.plotTicks;
};

GAxis.prototype.getAxisLabel = function () {
  return this.lab;
};
/*
 * Histogram class.
 */
class GHistogram {
  constructor(parent, type, dim, plotPoints) {
    // The parent processing object
    this.parent = parent;

    // General properties
    this.type = (type === GPlot.VERTICAL || type === GPlot.HORIZONTAL) ? type : GPlot.VERTICAL;
    this.dim = dim.slice();
    this.plotPoints = [];

    // Copy the plot points
    for (var i = 0; i < plotPoints.length; i++) {
      this.plotPoints[i] = new GPoint(plotPoints[i]);
    }

    this.visible = true;
    this.separations = [2];
    this.bgColors = [this.parent.color(150, 150, 255)];
    this.lineColors = [this.parent.color(100, 100, 255)];
    this.lineWidths = [1];
    this.differences = [];
    this.leftSides = [];
    this.rightSides = [];
    this.updateArrays();

    // Labels properties
    this.labelsOffset = 8;
    this.drawLabels = false;
    this.rotateLabels = false;
    this.fontName = "Helvetica";
    this.fontColor = this.parent.color(0);
    this.fontSize = 11;
  }
}
GHistogram.prototype.updateArrays = function () {
  var i;
  var nPoints = this.plotPoints.length;

  // Remove unused points
  if (this.differences.length > nPoints) {
    this.differences.splice(nPoints, Number.MAX_VALUE);
    this.leftSides.splice(nPoints, Number.MAX_VALUE);
    this.rightSides.splice(nPoints, Number.MAX_VALUE);
  }

  // Update the arrays
  if (nPoints === 1) {
    this.leftSides[0] = (this.type === GPlot.VERTICAL) ? 0.2 * this.dim[0] : 0.2 * this.dim[1];
    this.rightSides[0] = this.leftSides[0];
  } else if (nPoints > 1) {
    // Calculate the differences between consecutive points
    for (i = 0; i < nPoints - 1; i++) {
      if (this.plotPoints[i].isValid() && this.plotPoints[i + 1].isValid()) {
        var separation = this.separations[i % this.separations.length];
        var diff;

        if (this.type === GPlot.VERTICAL) {
          diff = this.plotPoints[i + 1].getX() - this.plotPoints[i].getX();
        } else {
          diff = this.plotPoints[i + 1].getY() - this.plotPoints[i].getY();
        }

        if (diff > 0) {
          this.differences[i] = (diff - separation) / 2;
        } else {
          this.differences[i] = (diff + separation) / 2;
        }
      } else {
        this.differences[i] = 0;
      }
    }

    // Fill the leftSides and rightSides arrays
    this.leftSides[0] = this.differences[0];
    this.rightSides[0] = this.differences[0];

    for (i = 1; i < nPoints - 1; i++) {
      this.leftSides[i] = this.differences[i - 1];
      this.rightSides[i] = this.differences[i];
    }

    this.leftSides[nPoints - 1] = this.differences[nPoints - 2];
    this.rightSides[nPoints - 1] = this.differences[nPoints - 2];
  }
};

GHistogram.prototype.draw = function (plotBasePoint) {
  if (this.visible) {
    // Calculate the baseline for the histogram
    var baseline = 0;

    if (plotBasePoint.isValid()) {
      baseline = (this.type === GPlot.VERTICAL) ? plotBasePoint.getY() : plotBasePoint.getX();
    }

    // Draw the rectangles
    var point, x1, x2, y1, y2, lw;
    var nPoints = this.plotPoints.length;

    this.parent.push();
    this.parent.rectMode(this.parent.CORNERS);
    this.parent.strokeCap(this.parent.SQUARE);

    for (var i = 0; i < nPoints; i++) {
      point = this.plotPoints[i];

      if (point.isValid()) {
        // Obtain the corners
        if (this.type === GPlot.VERTICAL) {
          x1 = point.getX() - this.leftSides[i];
          x2 = point.getX() + this.rightSides[i];
          y1 = point.getY();
          y2 = baseline;
        } else {
          x1 = baseline;
          x2 = point.getX();
          y1 = point.getY() - this.leftSides[i];
          y2 = point.getY() + this.rightSides[i];
        }

        if (x1 < 0) {
          x1 = 0;
        } else if (x1 > this.dim[0]) {
          x1 = this.dim[0];
        }

        if (-y1 < 0) {
          y1 = 0;
        } else if (-y1 > this.dim[1]) {
          y1 = -this.dim[1];
        }

        if (x2 < 0) {
          x2 = 0;
        } else if (x2 > this.dim[0]) {
          x2 = this.dim[0];
        }

        if (-y2 < 0) {
          y2 = 0;
        } else if (-y2 > this.dim[1]) {
          y2 = -this.dim[1];
        }

        // Draw the rectangle
        lw = this.lineWidths[i % this.lineWidths.length];
        this.parent.fill(this.bgColors[i % this.bgColors.length]);
        this.parent.stroke(this.lineColors[i % this.lineColors.length]);
        this.parent.strokeWeight(lw);

        if (Math.abs(x2 - x1) > 2 * lw && Math.abs(y2 - y1) > 2 * lw) {
          this.parent.rect(x1, y1, x2, y2);
        } else if ((this.type === GPlot.VERTICAL && x2 !== x1 && !(y1 === y2 && (y1 === 0 || y1 === -this.dim[1]))) || (this.type === GPlot.HORIZONTAL && y2 !== y1 && !(x1 === x2 && (x1 === 0 || x1 === this.dim[0])))) {
          this.parent.rect(x1, y1, x2, y2);
          this.parent.line(x1, y1, x1, y2);
          this.parent.line(x2, y1, x2, y2);
          this.parent.line(x1, y1, x2, y1);
          this.parent.line(x1, y2, x2, y2);
        }
      }
    }

    this.parent.pop();

    // Draw the labels
    if (this.drawLabels) {
      this.drawHistLabels();
    }
  }
};

GHistogram.prototype.drawHistLabels = function () {
  var point, i;
  var nPoints = this.plotPoints.length;
  var halfPI = 0.5 * Math.PI;

  this.parent.push();
  this.parent.textFont(this.fontName);
  this.parent.textSize(this.fontSize);
  this.parent.fill(this.fontColor);
  this.parent.noStroke();

  if (this.type === GPlot.VERTICAL) {
    if (this.rotateLabels) {
      this.parent.textAlign(this.parent.RIGHT, this.parent.CENTER);

      for (i = 0; i < nPoints; i++) {
        point = this.plotPoints[i];

        if (point.isValid() && point.getX() >= 0 && point.getX() <= this.dim[0]) {
          this.parent.push();
          this.parent.translate(point.getX(), this.labelsOffset);
          this.parent.rotate(-halfPI);
          this.parent.text(point.getLabel(), 0, 0);
          this.parent.pop();
        }
      }
    } else {
      this.parent.textAlign(this.parent.CENTER, this.parent.TOP);

      for (i = 0; i < nPoints; i++) {
        point = this.plotPoints[i];

        if (point.isValid() && point.getX() >= 0 && point.getX() <= this.dim[0]) {
          this.parent.text(point.getLabel(), point.getX(), this.labelsOffset);
        }
      }
    }
  } else {
    if (this.rotateLabels) {
      this.parent.textAlign(this.parent.CENTER, this.parent.BOTTOM);

      for (i = 0; i < nPoints; i++) {
        point = this.plotPoints[i];

        if (point.isValid() && -point.getY() >= 0 && -point.getY() <= this.dim[1]) {
          this.parent.push();
          this.parent.translate(-this.labelsOffset, point.getY());
          this.parent.rotate(-halfPI);
          this.parent.text(point.getLabel(), 0, 0);
          this.parent.pop();
        }
      }
    } else {
      this.parent.textAlign(this.parent.RIGHT, this.parent.CENTER);

      for (i = 0; i < nPoints; i++) {
        point = this.plotPoints[i];

        if (point.isValid() && -point.getY() >= 0 && -point.getY() <= this.dim[1]) {
          this.parent.text(point.getLabel(), -this.labelsOffset, point.getY());
        }
      }
    }
  }

  this.parent.pop();
};

GHistogram.prototype.setType = function (type) {
  if (type !== this.type && (type === GPlot.VERTICAL || type === GPlot.HORIZONTAL)) {
    this.type = type;
    this.updateArrays();
  }
};

GHistogram.prototype.setDim = function (...args) {
  var xDim, yDim;

  if (args.length === 2) {
    xDim = args[0];
    yDim = args[1];
  } else if (args.length === 1) {
    xDim = args[0][0];
    yDim = args[0][1];
  } else {
    throw new Error("GHistogram.setDim(): signature not supported");
  }

  if (xDim > 0 && yDim > 0) {
    this.dim[0] = xDim;
    this.dim[1] = yDim;
    this.updateArrays();
  }
};

GHistogram.prototype.setPlotPoints = function (plotPoints) {
  var i;
  var nPoints = plotPoints.length;

  if (this.plotPoints.length === nPoints) {
    for (i = 0; i < nPoints; i++) {
      this.plotPoints[i].set(plotPoints[i]);
    }
  } else if (this.plotPoints.length > nPoints) {
    for (i = 0; i < nPoints; i++) {
      this.plotPoints[i].set(plotPoints[i]);
    }

    this.plotPoints.splice(nPoints, Number.MAX_VALUE);
  } else {
    for (i = 0; i < this.plotPoints.length; i++) {
      this.plotPoints[i].set(plotPoints[i]);
    }

    for (i = this.plotPoints.length; i < nPoints; i++) {
      this.plotPoints[i] = new GPoint(plotPoints[i]);
    }
  }

  this.updateArrays();
};

GHistogram.prototype.setPlotPoint = function (index, plotPoint) {
  if (index < this.plotPoints.length) {
    this.plotPoints[index].set(plotPoint);
  } else if (index === this.plotPoints.length) {
    this.plotPoints[index] = new GPoint(plotPoint);
  } else {
    throw new Error("GHistogram.setPlotPoint(): the index position is outside the array size");
  }

  this.updateArrays();
};

GHistogram.prototype.addPlotPoint = function (...args) {
  if (args.length === 2) {
    this.plotPoints.push(new GPoint(args[0], args[1]));
  } else if (args.length === 1) {
    this.plotPoints.push(new GPoint(args[0]));
  } else {
    throw new Error("GHistogram.addPlotPoint(): signature not supported");
  }

  this.updateArrays();
};

GHistogram.prototype.removePlotPoint = function (index) {
  if (index < this.plotPoints.length) {
    this.plotPoints.splice(index, 1);
  } else {
    throw new Error("GHistogram.removePlotPoint(): the index position is outside the array size");
  }

  this.updateArrays();
};

GHistogram.prototype.setSeparations = function (separations) {
  this.separations = separations.slice();
  this.updateArrays();
};

GHistogram.prototype.setBgColors = function (bgColors) {
  this.bgColors = bgColors.slice();
};

GHistogram.prototype.setLineColors = function (lineColors) {
  this.lineColors = lineColors.slice();
};

GHistogram.prototype.setLineWidths = function (lineWidths) {
  this.lineWidths = lineWidths.slice();
};

GHistogram.prototype.setVisible = function (visible) {
  this.visible = visible;
};

GHistogram.prototype.setLabelsOffset = function (labelsOffset) {
  this.labelsOffset = labelsOffset;
};

GHistogram.prototype.setDrawLabels = function (drawLabels) {
  this.drawLabels = drawLabels;
};

GHistogram.prototype.setRotateLabels = function (rotateLabels) {
  this.rotateLabels = rotateLabels;
};

GHistogram.prototype.setFontName = function (fontName) {
  this.fontName = fontName;
};

GHistogram.prototype.setFontColor = function (fontColor) {
  this.fontColor = fontColor;
};

GHistogram.prototype.setFontSize = function (fontSize) {
  if (fontSize > 0) {
    this.fontSize = fontSize;
  }
};

GHistogram.prototype.setFontProperties = function (fontName, fontColor, fontSize) {
  if (fontSize > 0) {
    this.fontName = fontName;
    this.fontColor = fontColor;
    this.fontSize = fontSize;
  }
};
/*
 * Layer class. A GLayer usually contains an array of points and a histogram
 */
class GLayer {
  constructor(parent, id, dim, xLim, yLim, xLog, yLog) {
    // The parent processing object
    this.parent = parent;

    // General properties
    this.id = id;
    this.dim = dim.slice();
    this.xLim = xLim.slice();
    this.yLim = yLim.slice();
    this.xLog = xLog;
    this.yLog = yLog;

    // Do some sanity checks
    if (this.xLog && (this.xLim[0] <= 0 || this.xLim[1] <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
      console.log("Will set horizontal limits to (0.1, 10)");
      this.xLim[0] = 0.1;
      this.xLim[1] = 10;
    }

    if (this.yLog && (this.yLim[0] <= 0 || this.yLim[1] <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
      console.log("Will set vertical limits to (0.1, 10)");
      this.yLim[0] = 0.1;
      this.yLim[1] = 10;
    }

    // Points properties
    this.points = [];
    this.plotPoints = [];
    this.inside = [];
    this.pointColors = [this.parent.color(255, 0, 0, 150)];
    this.pointSizes = [7];

    // Line properties
    this.lineColor = this.parent.color(0, 150);
    this.lineWidth = 1;

    // Histogram properties
    this.hist = undefined;
    this.histBasePoint = new GPoint(0, 0);

    // Labels properties
    this.labelBgColor = this.parent.color(255, 200);
    this.labelSeparation = [7, 7];
    this.fontName = "Helvetica";
    this.fontColor = this.parent.color(0);
    this.fontSize = 11;

    // Helper variable
    this.cuts = [[0, 0], [0, 0], [0, 0], [0, 0]];
  }
};

GLayer.prototype.isValidNumber = function (number) {
  return !isNaN(number) && isFinite(number);
};

GLayer.prototype.isId = function (someId) {
  return this.id === someId;
};

GLayer.prototype.valueToXPlot = function (x) {
  if (this.xLog) {
    return this.dim[0] * Math.log(x / this.xLim[0]) / Math.log(this.xLim[1] / this.xLim[0]);
  } else {
    return this.dim[0] * (x - this.xLim[0]) / (this.xLim[1] - this.xLim[0]);
  }
};

GLayer.prototype.valueToYPlot = function (y) {
  if (this.yLog) {
    return -this.dim[1] * Math.log(y / this.yLim[0]) / Math.log(this.yLim[1] / this.yLim[0]);
  } else {
    return -this.dim[1] * (y - this.yLim[0]) / (this.yLim[1] - this.yLim[0]);
  }
};

GLayer.prototype.valueToPlot = function (...args) {
  if (args.length === 2) {
    return [this.valueToXPlot(args[0]), this.valueToYPlot(args[1])];
  } else if (args.length === 1 && args[0] instanceof GPoint) {
    return new GPoint(this.valueToXPlot(args[0].getX()), this.valueToYPlot(args[0].getY()), args[0].getLabel());
  } else if (args.length === 1 && args[0] instanceof Array && args[0][0] instanceof GPoint) {
    var xScalingFactor, yScalingFactor, point, xPlot, yPlot, i;
    var nPoints = args[0].length;
    var plotPts = [];

    // Go case by case. More code, but it's faster
    if (this.xLog && this.yLog) {
      xScalingFactor = this.dim[0] / Math.log(this.xLim[1] / this.xLim[0]);
      yScalingFactor = -this.dim[1] / Math.log(this.yLim[1] / this.yLim[0]);

      for (i = 0; i < nPoints; i++) {
        point = args[0][i];
        xPlot = Math.log(point.getX() / this.xLim[0]) * xScalingFactor;
        yPlot = Math.log(point.getY() / this.yLim[0]) * yScalingFactor;
        plotPts[i] = new GPoint(xPlot, yPlot, point.getLabel());
      }
    } else if (this.xLog) {
      xScalingFactor = this.dim[0] / Math.log(this.xLim[1] / this.xLim[0]);
      yScalingFactor = -this.dim[1] / (this.yLim[1] - this.yLim[0]);

      for (i = 0; i < nPoints; i++) {
        point = args[0][i];
        xPlot = Math.log(point.getX() / this.xLim[0]) * xScalingFactor;
        yPlot = (point.getY() - this.yLim[0]) * yScalingFactor;
        plotPts[i] = new GPoint(xPlot, yPlot, point.getLabel());
      }
    } else if (this.yLog) {
      xScalingFactor = this.dim[0] / (this.xLim[1] - this.xLim[0]);
      yScalingFactor = -this.dim[1] / Math.log(this.yLim[1] / this.yLim[0]);

      for (i = 0; i < nPoints; i++) {
        point = args[0][i];
        xPlot = (point.getX() - this.xLim[0]) * xScalingFactor;
        yPlot = Math.log(point.getY() / this.yLim[0]) * yScalingFactor;
        plotPts[i] = new GPoint(xPlot, yPlot, point.getLabel());
      }
    } else {
      xScalingFactor = this.dim[0] / (this.xLim[1] - this.xLim[0]);
      yScalingFactor = -this.dim[1] / (this.yLim[1] - this.yLim[0]);

      for (i = 0; i < nPoints; i++) {
        point = args[0][i];
        xPlot = (point.getX() - this.xLim[0]) * xScalingFactor;
        yPlot = (point.getY() - this.yLim[0]) * yScalingFactor;
        plotPts[i] = new GPoint(xPlot, yPlot, point.getLabel());
      }
    }

    return plotPts;
  } else {
    throw new Error("GLayer.valueToPlot(): signature not supported");
  }
};

GLayer.prototype.updatePlotPoints = function () {
  var xScalingFactor, yScalingFactor, point, xPlot, yPlot, i;
  var nPoints = this.points.length;

  // Update the plotPoints array size if necessary
  if (this.plotPoints.length < nPoints) {
    for (i = this.plotPoints.length; i < nPoints; i++) {
      this.plotPoints[i] = new GPoint();
    }
  } else if (this.plotPoints.length > nPoints) {
    this.plotPoints.splice(nPoints, Number.MAX_VALUE);
  }

  // Go case by case. More code, but it should be faster
  if (this.xLog && this.yLog) {
    xScalingFactor = this.dim[0] / Math.log(this.xLim[1] / this.xLim[0]);
    yScalingFactor = -this.dim[1] / Math.log(this.yLim[1] / this.yLim[0]);

    for (i = 0; i < nPoints; i++) {
      point = this.points[i];
      xPlot = Math.log(point.getX() / this.xLim[0]) * xScalingFactor;
      yPlot = Math.log(point.getY() / this.yLim[0]) * yScalingFactor;
      this.plotPoints[i].set(xPlot, yPlot, point.getLabel());
    }
  } else if (this.xLog) {
    xScalingFactor = this.dim[0] / Math.log(this.xLim[1] / this.xLim[0]);
    yScalingFactor = -this.dim[1] / (this.yLim[1] - this.yLim[0]);

    for (i = 0; i < nPoints; i++) {
      point = this.points[i];
      xPlot = Math.log(point.getX() / this.xLim[0]) * xScalingFactor;
      yPlot = (point.getY() - this.yLim[0]) * yScalingFactor;
      this.plotPoints[i].set(xPlot, yPlot, point.getLabel());
    }
  } else if (this.yLog) {
    xScalingFactor = this.dim[0] / (this.xLim[1] - this.xLim[0]);
    yScalingFactor = -this.dim[1] / Math.log(this.yLim[1] / this.yLim[0]);

    for (i = 0; i < nPoints; i++) {
      point = this.points[i];
      xPlot = (point.getX() - this.xLim[0]) * xScalingFactor;
      yPlot = Math.log(point.getY() / this.yLim[0]) * yScalingFactor;
      this.plotPoints[i].set(xPlot, yPlot, point.getLabel());
    }
  } else {
    xScalingFactor = this.dim[0] / (this.xLim[1] - this.xLim[0]);
    yScalingFactor = -this.dim[1] / (this.yLim[1] - this.yLim[0]);

    for (i = 0; i < nPoints; i++) {
      point = this.points[i];
      xPlot = (point.getX() - this.xLim[0]) * xScalingFactor;
      yPlot = (point.getY() - this.yLim[0]) * yScalingFactor;
      this.plotPoints[i].set(xPlot, yPlot, point.getLabel());
    }
  }
};

GLayer.prototype.xPlotToValue = function (xPlot) {
  if (this.xLog) {
    return Math.exp(Math.log(this.xLim[0]) + Math.log(this.xLim[1] / this.xLim[0]) * xPlot / this.dim[0]);
  } else {
    return this.xLim[0] + (this.xLim[1] - this.xLim[0]) * xPlot / this.dim[0];
  }
};

GLayer.prototype.yPlotToValue = function (yPlot) {
  if (this.yLog) {
    return Math.exp(Math.log(this.yLim[0]) - Math.log(this.yLim[1] / this.yLim[0]) * yPlot / this.dim[1]);
  } else {
    return this.yLim[0] - (this.yLim[1] - this.yLim[0]) * yPlot / this.dim[1];
  }
};

GLayer.prototype.plotToValue = function (xPlot, yPlot) {
  return [this.xPlotToValue(xPlot), this.yPlotToValue(yPlot)];
};

GLayer.prototype.isInside = function (...args) {
  var xPlot, yPlot, valid;

  if (args.length === 2) {
    xPlot = args[0];
    yPlot = args[1];
    valid = this.isValidNumber(xPlot) && this.isValidNumber(yPlot);
  } else if (args.length === 1 && args[0] instanceof GPoint) {
    xPlot = args[0].getX();
    yPlot = args[0].getY();
    valid = args[0].isValid();
  } else {
    throw new Error("GLayer.isInside(): signature not supported");
  }

  return (valid) ? (xPlot >= 0) && (xPlot <= this.dim[0]) && (-yPlot >= 0) && (-yPlot <= this.dim[1]) : false;
};

GLayer.prototype.updateInsideList = function () {
  var point;
  var nPoints = this.plotPoints.length;

  for (var i = 0; i < nPoints; i++) {
    point = this.plotPoints[i];
    this.inside[i] = (point.isValid()) ? (point.getX() >= 0) && (point.getX() <= this.dim[0]) && (-point.getY() >= 0) && (-point.getY() <= this.dim[1]) : false;
  }

  // Remove the unused elements
  if (this.inside.length > nPoints) {
    this.inside.splice(nPoints, Number.MAX_VALUE);
  }
};

GLayer.prototype.getPointIndexAtPlotPos = function (xPlot, yPlot) {
  var pointIndex;

  if (this.isInside(xPlot, yPlot)) {
    var point, distSq;
    var minDistSq = Number.MAX_VALUE;
    var nPoints = this.plotPoints.length;
    var nSizes = this.pointSizes.length;

    for (var i = 0; i < nPoints; i++) {
      if (this.inside[i]) {
        point = this.plotPoints[i];
        distSq = Math.pow(point.getX() - xPlot, 2) + Math.pow(point.getY() - yPlot, 2);

        if (distSq < Math.max(Math.pow(this.pointSizes[i % nSizes] / 2.0, 2), 25)) {
          if (distSq < minDistSq) {
            minDistSq = distSq;
            pointIndex = i;
          }
        }
      }
    }
  }

  return pointIndex;
};

GLayer.prototype.getPointAtPlotPos = function (xPlot, yPlot) {
  return this.points[this.getPointIndexAtPlotPos(xPlot, yPlot)];
};

GLayer.prototype.obtainBoxIntersections = function (plotPoint1, plotPoint2) {
  var nCuts = 0;

  if (plotPoint1.isValid() && plotPoint2.isValid()) {
    var x1 = plotPoint1.getX();
    var y1 = plotPoint1.getY();
    var x2 = plotPoint2.getX();
    var y2 = plotPoint2.getY();
    var inside1 = this.isInside(x1, y1);
    var inside2 = this.isInside(x2, y2);

    // Check if the line between the two points could cut the box borders
    var dontCut = (inside1 && inside2) || (x1 < 0 && x2 < 0) || (x1 > this.dim[0] && x2 > this.dim[0]) || (-y1 < 0 && -y2 < 0) || (-y1 > this.dim[1] && -y2 > this.dim[1]);

    if (!dontCut) {
      // Obtain the axis cuts of the line that cross the two points
      var deltaX = x2 - x1;
      var deltaY = y2 - y1;

      if (deltaX === 0) {
        nCuts = 2;
        this.cuts[0][0] = x1;
        this.cuts[0][1] = 0;
        this.cuts[1][0] = x1;
        this.cuts[1][1] = -this.dim[1];
      } else if (deltaY === 0) {
        nCuts = 2;
        this.cuts[0][0] = 0;
        this.cuts[0][1] = y1;
        this.cuts[1][0] = this.dim[0];
        this.cuts[1][1] = y1;
      } else {
        // Obtain the straight line (y = yCut + slope*x) that
        // crosses the two points
        var slope = deltaY / deltaX;
        var yCut = y1 - slope * x1;

        // Calculate the axis cuts of that line
        nCuts = 4;
        this.cuts[0][0] = -yCut / slope;
        this.cuts[0][1] = 0;
        this.cuts[1][0] = (-this.dim[1] - yCut) / slope;
        this.cuts[1][1] = -this.dim[1];
        this.cuts[2][0] = 0;
        this.cuts[2][1] = yCut;
        this.cuts[3][0] = this.dim[0];
        this.cuts[3][1] = yCut + slope * this.dim[0];
      }

      // Select only the cuts that fall inside the box and are located
      // between the two points
      nCuts = this.getValidCuts(this.cuts, nCuts, plotPoint1, plotPoint2);

      // Make sure we have the correct number of cuts
      if (inside1 || inside2) {
        // One of the points is inside. We should have one cut only
        if (nCuts !== 1) {
          var pointInside = (inside1) ? plotPoint1 : plotPoint2;

          // If too many cuts
          if (nCuts > 1) {
            nCuts = this.removeDuplicatedCuts(this.cuts, nCuts, 0);

            if (nCuts > 1) {
              nCuts = this.removePointFromCuts(this.cuts, nCuts, pointInside, 0);

              // In case of rounding number errors
              if (nCuts > 1) {
                nCuts = this.removeDuplicatedCuts(this.cuts, nCuts, 0.001);

                if (nCuts > 1) {
                  nCuts = this.removePointFromCuts(this.cuts, nCuts, pointInside, 0.001);
                }
              }
            }
          }

          // If the cut is missing, then it must be equal to the point
          // inside
          if (nCuts === 0) {
            nCuts = 1;
            this.cuts[0][0] = pointInside.getX();
            this.cuts[0][1] = pointInside.getY();
          }
        }
      } else {
        // Both points are outside. We should have either two cuts or
        // none
        if (nCuts > 2) {
          nCuts = this.removeDuplicatedCuts(this.cuts, nCuts, 0);

          // In case of rounding number errors
          if (nCuts > 2) {
            nCuts = this.removeDuplicatedCuts(this.cuts, nCuts, 0.001);
          }
        }

        // If we have two cuts, order them (the closest to the first
        // point goes first)
        if (nCuts === 2) {
          if ((Math.pow(this.cuts[0][0] - x1, 2) + Math.pow(this.cuts[0][1] - y1), 2) > (Math.pow(this.cuts[1][0] - x1, 2) + Math.pow(this.cuts[1][1] - y1, 2))) {
            this.cuts[2][0] = this.cuts[0][0];
            this.cuts[2][1] = this.cuts[0][1];
            this.cuts[0][0] = this.cuts[1][0];
            this.cuts[0][1] = this.cuts[1][1];
            this.cuts[1][0] = this.cuts[2][0];
            this.cuts[1][1] = this.cuts[2][1];
          }
        }

        // If one cut is missing, add the same one twice
        if (nCuts === 1) {
          nCuts = 2;
          this.cuts[1][0] = this.cuts[0][0];
          this.cuts[1][1] = this.cuts[0][1];
        }
      }

      // Some sanity checks
      if ((inside1 || inside2) && nCuts !== 1) {
        console.log("There should be one cut!!!");
      } else if (!inside1 && !inside2 && nCuts !== 0 && nCuts !== 2) {
        console.log("There should be either 0 or 2 cuts!!! " + nCuts + " were found");
      }
    }
  }

  return nCuts;
};

GLayer.prototype.getValidCuts = function (cuts, nCuts, plotPoint1, plotPoint2) {
  var x1 = plotPoint1.getX();
  var y1 = plotPoint1.getY();
  var x2 = plotPoint2.getX();
  var y2 = plotPoint2.getY();
  var deltaX = Math.abs(x2 - x1);
  var deltaY = Math.abs(y2 - y1);
  var counter = 0;

  for (var i = 0; i < nCuts; i++) {
    // Check that the cut is inside the inner plotting area
    if (this.isInside(cuts[i][0], cuts[i][1])) {
      // Check that the cut falls between the two points
      if (Math.abs(cuts[i][0] - x1) <= deltaX && Math.abs(cuts[i][1] - y1) <= deltaY && Math.abs(cuts[i][0] - x2) <= deltaX && Math.abs(cuts[i][1] - y2) <= deltaY) {
        cuts[counter][0] = cuts[i][0];
        cuts[counter][1] = cuts[i][1];
        counter++;
      }
    }
  }

  return counter;
};

GLayer.prototype.removeDuplicatedCuts = function (cuts, nCuts, tolerance) {
  var repeated;
  var counter = 0;

  for (var i = 0; i < nCuts; i++) {
    repeated = false;

    for (var j = 0; j < counter; j++) {
      if (Math.abs(cuts[j][0] - cuts[i][0]) <= tolerance && Math.abs(cuts[j][1] - cuts[i][1]) <= tolerance) {
        repeated = true;
        break;
      }
    }

    if (!repeated) {
      cuts[counter][0] = cuts[i][0];
      cuts[counter][1] = cuts[i][1];
      counter++;
    }
  }

  return counter;
};

GLayer.prototype.removePointFromCuts = function (cuts, nCuts, plotPoint, tolerance) {
  var x = plotPoint.getX();
  var y = plotPoint.getY();
  var counter = 0;

  for (var i = 0; i < nCuts; i++) {
    if (Math.abs(cuts[i][0] - x) > tolerance || Math.abs(cuts[i][1] - y) > tolerance) {
      cuts[counter][0] = cuts[i][0];
      cuts[counter][1] = cuts[i][1];
      counter++;
    }
  }

  return counter;
};

GLayer.prototype.startHistogram = function (histType) {
  this.hist = new GHistogram(this.parent, histType, this.dim, this.plotPoints);
};

GLayer.prototype.drawPoints = function (...args) {
  var nPoints, i;

  if (args.length === 0) {
    nPoints = this.plotPoints.length;
    var nColors = this.pointColors.length;
    var nSizes = this.pointSizes.length;

    this.parent.push();
    this.parent.ellipseMode(this.parent.CENTER);
    this.parent.noStroke();

    if (nColors === 1 && nSizes === 1) {
      this.parent.fill(this.pointColors[0]);

      for (i = 0; i < nPoints; i++) {
        if (this.inside[i]) {
          this.parent.ellipse(this.plotPoints[i].getX(), this.plotPoints[i].getY(), this.pointSizes[0], this.pointSizes[0]);
        }
      }
    } else if (nColors === 1) {
      this.parent.fill(this.pointColors[0]);

      for (i = 0; i < nPoints; i++) {
        if (this.inside[i]) {
          this.parent.ellipse(this.plotPoints[i].getX(), this.plotPoints[i].getY(), this.pointSizes[i % nSizes], this.pointSizes[i % nSizes]);
        }
      }
    } else if (nSizes === 1) {
      for (i = 0; i < nPoints; i++) {
        if (this.inside[i]) {
          this.parent.fill(this.pointColors[i % nColors]);
          this.parent.ellipse(this.plotPoints[i].getX(), this.plotPoints[i].getY(), this.pointSizes[0], this.pointSizes[0]);
        }
      }
    } else {
      for (i = 0; i < nPoints; i++) {
        if (this.inside[i]) {
          this.parent.fill(this.pointColors[i % nColors]);
          this.parent.ellipse(this.plotPoints[i].getX(), this.plotPoints[i].getY(), this.pointSizes[i % nSizes], this.pointSizes[i % nSizes]);
        }
      }
    }

    this.parent.pop();
  } else if (args.length === 1 && args[0] instanceof p5.Image) {
    nPoints = this.plotPoints.length;

    this.parent.push();
    this.parent.imageMode(this.parent.CENTER);

    for (i = 0; i < nPoints; i++) {
      if (this.inside[i]) {
        this.parent.image(args[0], this.plotPoints[i].getX(), this.plotPoints[i].getY());
      }
    }

    this.parent.pop();
  } else {
    throw new Error("GLayer.drawPoints(): signature not supported");
  }
};

GLayer.prototype.drawPoint = function (...args) {
  var point, pointColor, pointSize, pointImg;

  if (args.length === 3) {
    point = args[0];
    pointColor = args[1];
    pointSize = args[2];
  } else if (args.length === 2 && args[1] instanceof p5.Image) {
    point = args[0];
    pointImg = args[1];
  } else if (args.length === 1) {
    point = args[0];
    pointColor = this.pointColors[0];
    pointSize = this.pointSizes[0];
  } else {
    throw new Error("GLayer.drawPoint(): signature not supported");
  }

  var xPlot = this.valueToXPlot(point.getX());
  var yPlot = this.valueToYPlot(point.getY());

  if (this.isInside(xPlot, yPlot)) {
    this.parent.push();

    if (typeof pointImg !== "undefined") {
      this.parent.imageMode(this.parent.CENTER);
      this.parent.image(pointImg, xPlot, yPlot);
    } else {
      this.parent.ellipseMode(this.parent.CENTER);
      this.parent.fill(pointColor);
      this.parent.noStroke();
      this.parent.ellipse(xPlot, yPlot, pointSize, pointSize);
    }

    this.parent.pop();
  }
};

GLayer.prototype.drawLines = function () {
  var nPoints = this.plotPoints.length;

  this.parent.push();
  this.parent.noFill();
  this.parent.stroke(this.lineColor);
  this.parent.strokeWeight(this.lineWidth);
  this.parent.strokeCap(this.parent.SQUARE);

  for (var i = 0; i < nPoints - 1; i++) {
    if (this.inside[i] && this.inside[i + 1]) {
      this.parent.line(this.plotPoints[i].getX(), this.plotPoints[i].getY(), this.plotPoints[i + 1].getX(), this.plotPoints[i + 1].getY());
    } else if (this.plotPoints[i].isValid() && this.plotPoints[i + 1].isValid()) {
      // At least one of the points is outside the inner region.
      // Obtain the valid line box intersections
      var nCuts = this.obtainBoxIntersections(this.plotPoints[i], this.plotPoints[i + 1]);

      if (this.inside[i]) {
        this.parent.line(this.plotPoints[i].getX(), this.plotPoints[i].getY(), this.cuts[0][0], this.cuts[0][1]);
      } else if (this.inside[i + 1]) {
        this.parent.line(this.cuts[0][0], this.cuts[0][1], this.plotPoints[i + 1].getX(), this.plotPoints[i + 1].getY());
      } else if (nCuts >= 2) {
        this.parent.line(this.cuts[0][0], this.cuts[0][1], this.cuts[1][0], this.cuts[1][1]);
      }
    }
  }

  this.parent.pop();
};

GLayer.prototype.drawLine = function (...args) {
  var point1, point2, lc, lw, slope, yCut;

  if (args.length === 4 && args[0] instanceof GPoint) {
    point1 = args[0];
    point2 = args[1];
    lc = args[2];
    lw = args[3];
  } else if (args.length === 4) {
    slope = args[0];
    yCut = args[1];
    lc = args[2];
    lw = args[3];
  } else if (args.length === 2 && args[0] instanceof GPoint) {
    point1 = args[0];
    point2 = args[1];
    lc = this.lineColor;
    lw = this.lineWidth;
  } else if (args.length === 2) {
    slope = args[0];
    yCut = args[1];
    lc = this.lineColor;
    lw = this.lineWidth;
  } else {
    throw new Error("GLayer.drawLine(): signature not supported");
  }

  if (typeof slope !== "undefined") {
    if (this.xLog && this.yLog) {
      point1 = new GPoint(this.xLim[0], Math.pow(10, slope * Math.log(this.xLim[0]) / Math.LN10 + yCut));
      point2 = new GPoint(this.xLim[1], Math.pow(10, slope * Math.log(this.xLim[1]) / Math.LN10 + yCut));
    } else if (this.xLog) {
      point1 = new GPoint(this.xLim[0], slope * Math.log(this.xLim[0]) / Math.LN10 + yCut);
      point2 = new GPoint(this.xLim[1], slope * Math.log(this.xLim[1]) / Math.LN10 + yCut);
    } else if (this.yLog) {
      point1 = new GPoint(this.xLim[0], Math.pow(10, slope * this.xLim[0] + yCut));
      point2 = new GPoint(this.xLim[1], Math.pow(10, slope * this.xLim[1] + yCut));
    } else {
      point1 = new GPoint(this.xLim[0], slope * this.xLim[0] + yCut);
      point2 = new GPoint(this.xLim[1], slope * this.xLim[1] + yCut);
    }
  }

  var plotPoint1 = this.valueToPlot(point1);
  var plotPoint2 = this.valueToPlot(point2);

  if (plotPoint1.isValid() && plotPoint2.isValid()) {
    var inside1 = this.isInside(plotPoint1);
    var inside2 = this.isInside(plotPoint2);

    this.parent.push();
    this.parent.noFill();
    this.parent.stroke(lc);
    this.parent.strokeWeight(lw);
    this.parent.strokeCap(this.parent.SQUARE);

    if (inside1 && inside2) {
      this.parent.line(plotPoint1.getX(), plotPoint1.getY(), plotPoint2.getX(), plotPoint2.getY());
    } else {
      // At least one of the points is outside the inner region.
      // Obtain the valid line box intersections
      var nCuts = this.obtainBoxIntersections(plotPoint1, plotPoint2);

      if (inside1) {
        this.parent.line(plotPoint1.getX(), plotPoint1.getY(), this.cuts[0][0], this.cuts[0][1]);
      } else if (inside2) {
        this.parent.line(this.cuts[0][0], this.cuts[0][1], plotPoint2.getX(), plotPoint2.getY());
      } else if (nCuts >= 2) {
        this.parent.line(this.cuts[0][0], this.cuts[0][1], this.cuts[1][0], this.cuts[1][1]);
      }
    }

    this.parent.pop();
  }
};

GLayer.prototype.drawHorizontalLine = function (...args) {
  var value, lc, lw;

  if (args.length === 3) {
    value = args[0];
    lc = args[1];
    lw = args[2];
  } else if (args.length === 1) {
    value = args[0];
    lc = this.lineColor;
    lw = this.lineWidth;
  } else {
    throw new Error("GLayer.drawHorizontalLine(): signature not supported");
  }

  var yPlot = this.valueToYPlot(value);

  if (this.isValidNumber(yPlot) && -yPlot >= 0 && -yPlot <= this.dim[1]) {
    this.parent.push();
    this.parent.noFill();
    this.parent.stroke(lc);
    this.parent.strokeWeight(lw);
    this.parent.strokeCap(this.parent.SQUARE);
    this.parent.line(0, yPlot, this.dim[0], yPlot);
    this.parent.pop();
  }
};

GLayer.prototype.drawVerticalLine = function (...args) {
  var value, lc, lw;

  if (args.length === 3) {
    value = args[0];
    lc = args[1];
    lw = args[2];
  } else if (args.length === 1) {
    value = args[0];
    lc = this.lineColor;
    lw = this.lineWidth;
  } else {
    throw new Error("GLayer.drawVerticalLine(): signature not supported");
  }

  var xPlot = this.valueToXPlot(value);

  if (this.isValidNumber(xPlot) && xPlot >= 0 && xPlot <= this.dim[0]) {
    this.parent.push();
    this.parent.noFill();
    this.parent.stroke(lc);
    this.parent.strokeWeight(lw);
    this.parent.strokeCap(this.parent.SQUARE);
    this.parent.line(xPlot, 0, xPlot, -this.dim[1]);
    this.parent.pop();
  }
};

GLayer.prototype.drawFilledContour = function (contourType, referenceValue) {
  // Get the points that compose the shape
  var shapePoints;

  if (contourType === GPlot.HORIZONTAL) {
    shapePoints = this.getHorizontalShape(referenceValue);
  } else if (contourType === GPlot.VERTICAL) {
    shapePoints = this.getVerticalShape(referenceValue);
  }

  // Draw the shape
  if (typeof shapePoints !== "undefined" && shapePoints.length > 0) {
    this.parent.push();
    this.parent.fill(this.lineColor);
    this.parent.noStroke();
    this.parent.beginShape();

    for (var i = 0; i < shapePoints.length; i++) {
      if (shapePoints[i].isValid()) {
        this.parent.vertex(shapePoints[i].getX(), shapePoints[i].getY());
      }
    }

    this.parent.endShape(this.parent.CLOSE);
    this.parent.pop();
  }
};

GLayer.prototype.getHorizontalShape = function (referenceValue) {
  // Collect the points and cuts inside the box
  var point, addedPoints, nextIndex;
  var nPoints = this.plotPoints.length;
  var shapePoints = [];
  var indexFirstPoint = -1;
  var indexLastPoint = -1;

  for (var i = 0; i < nPoints; i++) {
    point = this.plotPoints[i];

    if (point.isValid()) {
      addedPoints = false;

      // Add the point if it's inside the box
      if (this.inside[i]) {
        shapePoints.push(new GPoint(point.getX(), point.getY(), "normal point"));
        addedPoints = true;
      } else if (point.getX() >= 0 && point.getX() <= this.dim[0]) {
        // If it's outside, add the projection of the point on the
        // horizontal axes
        if (-point.getY() < 0) {
          shapePoints.push(new GPoint(point.getX(), 0, "projection"));
          addedPoints = true;
        } else {
          shapePoints.push(new GPoint(point.getX(), -this.dim[1], "projection"));
          addedPoints = true;
        }
      }

      // Add the box cuts if there is any
      nextIndex = i + 1;

      while (nextIndex < nPoints - 1 && !this.plotPoints[nextIndex].isValid()) {
        nextIndex++;
      }

      if (nextIndex < nPoints && this.plotPoints[nextIndex].isValid()) {
        var nCuts = this.obtainBoxIntersections(point, this.plotPoints[nextIndex]);

        for (var j = 0; j < nCuts; j++) {
          shapePoints.push(new GPoint(this.cuts[j][0], this.cuts[j][1], "cut"));
          addedPoints = true;
        }
      }

      if (addedPoints) {
        if (indexFirstPoint < 0) {
          indexFirstPoint = i;
        }

        indexLastPoint = i;
      }
    }
  }

  // Continue if there are points in the shape
  if (shapePoints.length > 0) {
    // Calculate the starting point
    var startPoint = new GPoint(shapePoints[0]);

    if (startPoint.getX() !== 0 && startPoint.getX() !== this.dim[0]) {
      if (startPoint.getLabel() === "cut") {
        if (this.plotPoints[indexFirstPoint].getX() < 0) {
          startPoint.setX(0);
          startPoint.setLabel("extreme");
        } else {
          startPoint.setX(this.dim[0]);
          startPoint.setLabel("extreme");
        }
      } else if (indexFirstPoint !== 0) {
        // Get the previous valid point
        var prevIndex = indexFirstPoint - 1;

        while (prevIndex > 0 && !this.plotPoints[prevIndex].isValid()) {
          prevIndex--;
        }

        if (this.plotPoints[prevIndex].isValid()) {
          if (this.plotPoints[prevIndex].getX() < 0) {
            startPoint.setX(0);
            startPoint.setLabel("extreme");
          } else {
            startPoint.setX(this.dim[0]);
            startPoint.setLabel("extreme");
          }
        }
      }
    }

    // Calculate the end point
    var endPoint = new GPoint(shapePoints[shapePoints.length - 1]);

    if (endPoint.getX() !== 0 && endPoint.getX() !== this.dim[0] && indexLastPoint !== nPoints - 1) {
      nextIndex = indexLastPoint + 1;

      while (nextIndex < nPoints - 1 && !this.plotPoints[nextIndex].isValid()) {
        nextIndex++;
      }

      if (this.plotPoints[nextIndex].isValid()) {
        if (this.plotPoints[nextIndex].getX() < 0) {
          endPoint.setX(0);
          endPoint.setLabel("extreme");
        } else {
          endPoint.setX(this.dim[0]);
          endPoint.setLabel("extreme");
        }
      }
    }

    // Add the end point if it's a new extreme
    if (endPoint.getLabel() === "extreme") {
      shapePoints.push(endPoint);
    }

    // Add the reference connections
    if (this.yLog && referenceValue <= 0) {
      referenceValue = Math.min(this.yLim[0], this.yLim[1]);
    }

    var plotReference = this.valueToPlot(1, referenceValue);

    if (-plotReference[1] < 0) {
      shapePoints.push(new GPoint(endPoint.getX(), 0));
      shapePoints.push(new GPoint(startPoint.getX(), 0));
    } else if (-plotReference[1] > this.dim[1]) {
      shapePoints.push(new GPoint(endPoint.getX(), -this.dim[1]));
      shapePoints.push(new GPoint(startPoint.getX(), -this.dim[1]));
    } else {
      shapePoints.push(new GPoint(endPoint.getX(), plotReference[1]));
      shapePoints.push(new GPoint(startPoint.getX(), plotReference[1]));
    }

    // Add the starting point if it's a new extreme
    if (startPoint.getLabel() === "extreme") {
      shapePoints.push(startPoint);
    }
  }

  return shapePoints;
};

GLayer.prototype.getVerticalShape = function (referenceValue) {
  // Collect the points and cuts inside the box
  var point, addedPoints, nextIndex;
  var nPoints = this.plotPoints.length;
  var shapePoints = [];
  var indexFirstPoint = -1;
  var indexLastPoint = -1;

  for (var i = 0; i < nPoints; i++) {
    point = this.plotPoints[i];

    if (point.isValid()) {
      addedPoints = false;

      // Add the point if it's inside the box
      if (this.inside[i]) {
        shapePoints.push(new GPoint(point.getX(), point.getY(), "normal point"));
        addedPoints = true;
      } else if (-point.getY() >= 0 && -point.getY() <= this.dim[1]) {
        // If it's outside, add the projection of the point on the
        // vertical axes
        if (point.getX() < 0) {
          shapePoints.push(new GPoint(0, point.getY(), "projection"));
          addedPoints = true;
        } else {
          shapePoints.push(new GPoint(this.dim[0], point.getY(), "projection"));
          addedPoints = true;
        }
      }

      // Add the box cuts if there is any
      nextIndex = i + 1;

      while (nextIndex < nPoints - 1 && !this.plotPoints[nextIndex].isValid()) {
        nextIndex++;
      }

      if (nextIndex < nPoints && this.plotPoints[nextIndex].isValid()) {
        var nCuts = this.obtainBoxIntersections(point, this.plotPoints[nextIndex]);

        for (var j = 0; j < nCuts; j++) {
          shapePoints.push(new GPoint(this.cuts[j][0], this.cuts[j][1], "cut"));
          addedPoints = true;
        }
      }

      if (addedPoints) {
        if (indexFirstPoint < 0) {
          indexFirstPoint = i;
        }

        indexLastPoint = i;
      }
    }
  }

  // Continue if there are points in the shape
  if (shapePoints.length > 0) {
    // Calculate the starting point
    var startPoint = new GPoint(shapePoints[0]);

    if (startPoint.getY() !== 0 && startPoint.getY() !== -this.dim[1]) {
      if (startPoint.getLabel() === "cut") {
        if (-this.plotPoints[indexFirstPoint].getY() < 0) {
          startPoint.setY(0);
          startPoint.setLabel("extreme");
        } else {
          startPoint.setY(-this.dim[1]);
          startPoint.setLabel("extreme");
        }
      } else if (indexFirstPoint !== 0) {
        // Get the previous valid point
        var prevIndex = indexFirstPoint - 1;

        while (prevIndex > 0 && !this.plotPoints[prevIndex].isValid()) {
          prevIndex--;
        }

        if (this.plotPoints[prevIndex].isValid()) {
          if (-this.plotPoints[prevIndex].getY() < 0) {
            startPoint.setY(0);
            startPoint.setLabel("extreme");
          } else {
            startPoint.setY(-this.dim[1]);
            startPoint.setLabel("extreme");
          }
        }
      }
    }

    // Calculate the end point
    var endPoint = new GPoint(shapePoints[shapePoints.length - 1]);

    if (endPoint.getY() !== 0 && endPoint.getY() !== -this.dim[1] && indexLastPoint !== nPoints - 1) {
      nextIndex = indexLastPoint + 1;

      while (nextIndex < nPoints - 1 && !this.plotPoints[nextIndex].isValid()) {
        nextIndex++;
      }

      if (this.plotPoints[nextIndex].isValid()) {
        if (-this.plotPoints[nextIndex].getY() < 0) {
          endPoint.setY(0);
          endPoint.setLabel("extreme");
        } else {
          endPoint.setY(-this.dim[1]);
          endPoint.setLabel("extreme");
        }
      }
    }

    // Add the end point if it's a new extreme
    if (endPoint.getLabel() === "extreme") {
      shapePoints.push(endPoint);
    }

    // Add the reference connections
    if (this.xLog && referenceValue <= 0) {
      referenceValue = Math.min(this.xLim[0], this.xLim[1]);
    }

    var plotReference = this.valueToPlot(referenceValue, 1);

    if (plotReference[0] < 0) {
      shapePoints.push(new GPoint(0, endPoint.getY()));
      shapePoints.push(new GPoint(0, startPoint.getY()));
    } else if (plotReference[0] > this.dim[0]) {
      shapePoints.push(new GPoint(this.dim[0], endPoint.getY()));
      shapePoints.push(new GPoint(this.dim[0], startPoint.getY()));
    } else {
      shapePoints.push(new GPoint(plotReference[0], endPoint.getY()));
      shapePoints.push(new GPoint(plotReference[0], startPoint.getY()));
    }

    // Add the starting point if it's a new extreme
    if (startPoint.getLabel() === "extreme") {
      shapePoints.push(startPoint);
    }
  }

  return shapePoints;
};

GLayer.prototype.drawLabel = function (point) {
  var xPlot = this.valueToXPlot(point.getX());
  var yPlot = this.valueToYPlot(point.getY());

  if (this.isValidNumber(xPlot) && this.isValidNumber(yPlot)) {
    var xLabelPos = xPlot + this.labelSeparation[0];
    var yLabelPos = yPlot - this.labelSeparation[1];
    var delta = this.fontSize / 4;

    this.parent.push();
    this.parent.rectMode(this.parent.CORNER);
    this.parent.noStroke();
    this.parent.textFont(this.fontName);
    this.parent.textSize(this.fontSize);
    this.parent.textAlign(this.parent.LEFT, this.parent.BOTTOM);

    // Draw the background
    this.parent.fill(this.labelBgColor);
    this.parent.rect(xLabelPos - delta, yLabelPos - this.fontSize - delta, this.parent.textWidth(point.getLabel()) + 2 * delta, this.fontSize + 2 * delta);

    // Draw the text
    this.parent.fill(this.fontColor);
    this.parent.text(point.getLabel(), xLabelPos, yLabelPos);
    this.parent.pop();
  }
};

GLayer.prototype.drawLabelAtPlotPos = function (xPlot, yPlot) {
  var point = this.getPointAtPlotPos(xPlot, yPlot);

  if (typeof point !== "undefined") {
    this.drawLabel(point);
  }
};

GLayer.prototype.drawHistogram = function () {
  if (typeof this.hist !== "undefined") {
    this.hist.draw(this.valueToPlot(this.histBasePoint));
  }
};

GLayer.prototype.drawPolygon = function (polygonPoints, polygonColor) {
  var i;

  if (polygonPoints.length > 2) {
    // Remove the polygon invalid points
    var plotPolygonPoints = this.valueToPlot(polygonPoints);
    var counter = 0;

    for (i = 0; i < plotPolygonPoints.length; i++) {
      if (plotPolygonPoints[i].isValid()) {
        plotPolygonPoints[counter] = plotPolygonPoints[i];
        counter++;
      }
    }

    plotPolygonPoints.splice(counter, Number.MAX_VALUE);

    // Create a temporal array with the points inside the plotting area
    // and the valid box cuts
    var point;
    var nPoints = plotPolygonPoints.length;
    var tmp = [];

    for (i = 0; i < nPoints; i++) {
      point = plotPolygonPoints[i];

      if (this.isInside(point)) {
        tmp.push(new GPoint(point.getX(), point.getY(), "normal point"));
      }

      // Obtain the cuts with the next point
      var nextIndex = (i + 1 < nPoints) ? i + 1 : 0;
      var nCuts = this.obtainBoxIntersections(point, plotPolygonPoints[nextIndex]);

      if (nCuts === 1) {
        tmp.push(new GPoint(this.cuts[0][0], this.cuts[0][1], "single cut"));
      } else if (nCuts > 1) {
        tmp.push(new GPoint(this.cuts[0][0], this.cuts[0][1], "double cut"));
        tmp.push(new GPoint(this.cuts[1][0], this.cuts[1][1], "double cut"));
      }
    }

    // Final version of the polygon
    nPoints = tmp.length;
    var croppedPoly = [];

    for (i = 0; i < nPoints; i++) {
      // Add the point
      croppedPoly.push(tmp[i]);

      // Add new points in case we have two consecutive cuts, one of
      // them is single, and they are in consecutive axes
      var next = (i + 1 < nPoints) ? i + 1 : 0;
      var label = tmp[i].getLabel();
      var nextLabel = tmp[next].getLabel();

      var cond = (label === "single cut" && nextLabel === "single cut") || (label === "single cut" && nextLabel === "double cut") || (label === "double cut" && nextLabel === "single cut");

      if (cond) {
        var x1 = tmp[i].getX();
        var y1 = tmp[i].getY();
        var x2 = tmp[next].getX();
        var y2 = tmp[next].getY();
        var deltaX = Math.abs(x2 - x1);
        var deltaY = Math.abs(y2 - y1);

        // Check that they come from consecutive axes
        if (deltaX > 0 && deltaY > 0 && deltaX !== this.dim[0] && deltaY !== this.dim[1]) {
          var x = (x1 === 0 || x1 === this.dim[0]) ? x1 : x2;
          var y = (y1 === 0 || y1 === -this.dim[1]) ? y1 : y2;
          croppedPoly.push(new GPoint(x, y, "special cut"));
        }
      }
    }

    // Draw the cropped polygon
    if (croppedPoly.length > 2) {
      this.parent.push();
      this.parent.fill(polygonColor);
      this.parent.noStroke();
      this.parent.beginShape();

      for (i = 0; i < croppedPoly.length; i++) {
        this.parent.vertex(croppedPoly[i].getX(), croppedPoly[i].getY());
      }

      this.parent.endShape(this.parent.CLOSE);
      this.parent.pop();
    }
  }
};

GLayer.prototype.drawAnnotation = function (text, x, y, horAlign, verAlign) {
  var xPlot = this.valueToXPlot(x);
  var yPlot = this.valueToYPlot(y);

  if (this.isValidNumber(xPlot) && this.isValidNumber(yPlot) && this.isInside(xPlot, yPlot)) {
    if (horAlign !== this.parent.CENTER && horAlign !== this.parent.RIGHT && horAlign !== this.parent.LEFT) {
      horAlign = this.parent.LEFT;
    }

    if (verAlign !== this.parent.CENTER && verAlign !== this.parent.TOP && verAlign !== this.parent.BOTTOM) {
      verAlign = this.parent.CENTER;
    }

    // A trick to really center the text vertically
    if (verAlign === this.parent.CENTER) {
      verAlign = this.parent.BOTTOM;
      yPlot += this.fontSize / 2;
    }

    this.parent.push();
    this.parent.textFont(this.fontName);
    this.parent.textSize(this.fontSize);
    this.parent.fill(this.fontColor);
    this.parent.textAlign(horAlign, verAlign);
    this.parent.text(text, xPlot, yPlot);
    this.parent.pop();
  }
};

GLayer.prototype.setDim = function (...args) {
  var xDim, yDim;

  if (args.length === 2) {
    xDim = args[0];
    yDim = args[1];
  } else if (args.length === 1) {
    xDim = args[0][0];
    yDim = args[0][1];
  } else {
    throw new Error("GLayer.setDim(): signature not supported");
  }

  if (xDim > 0 && yDim > 0) {
    this.dim[0] = xDim;
    this.dim[1] = yDim;
    this.updatePlotPoints();

    if (typeof this.hist !== "undefined") {
      this.hist.setDim(this.dim);
      this.hist.setPlotPoints(this.plotPoints);
    }
  }
};

GLayer.prototype.setXLim = function (...args) {
  var xMin, xMax;

  if (args.length === 2) {
    xMin = args[0];
    xMax = args[1];
  } else if (args.length === 1) {
    xMin = args[0][0];
    xMax = args[0][1];
  } else {
    throw new Error("GLayer.setXLim(): signature not supported");
  }

  if (xMin !== xMax && this.isValidNumber(xMin) && this.isValidNumber(xMax)) {
    // Make sure the new limits makes sense
    if (this.xLog && (xMin <= 0 || xMax <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
    } else {
      this.xLim[0] = xMin;
      this.xLim[1] = xMax;
      this.updatePlotPoints();
      this.updateInsideList();

      if (typeof this.hist !== "undefined") {
        this.hist.setPlotPoints(this.plotPoints);
      }
    }
  }
};

GLayer.prototype.setYLim = function (...args) {
  var yMin, yMax;

  if (args.length === 2) {
    yMin = args[0];
    yMax = args[1];
  } else if (args.length === 1) {
    yMin = args[0][0];
    yMax = args[0][1];
  } else {
    throw new Error("GLayer.setYLim(): signature not supported");
  }

  if (yMin !== yMax && this.isValidNumber(yMin) && this.isValidNumber(yMax)) {
    // Make sure the new limits makes sense
    if (this.yLog && (yMin <= 0 || yMax <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
    } else {
      this.yLim[0] = yMin;
      this.yLim[1] = yMax;
      this.updatePlotPoints();
      this.updateInsideList();

      if (typeof this.hist !== "undefined") {
        this.hist.setPlotPoints(this.plotPoints);
      }
    }
  }
};

GLayer.prototype.setXYLim = function (...args) {
  var xMin, xMax, yMin, yMax;

  if (args.length === 4) {
    xMin = args[0];
    xMax = args[1];
    yMin = args[2];
    yMax = args[3];
  } else if (args.length === 2) {
    xMin = args[0][0];
    xMax = args[0][1];
    yMin = args[1][0];
    yMax = args[1][1];
  } else {
    throw new Error("GLayer.setXYLim(): signature not supported");
  }

  if (xMin !== xMax && yMin !== yMax && this.isValidNumber(xMin) && this.isValidNumber(xMax) && this.isValidNumber(yMin) && this.isValidNumber(yMax)) {
    // Make sure the new limits make sense
    if (this.xLog && (xMin <= 0 || xMax <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
    } else {
      this.xLim[0] = xMin;
      this.xLim[1] = xMax;
    }

    if (this.yLog && (yMin <= 0 || yMax <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
    } else {
      this.yLim[0] = yMin;
      this.yLim[1] = yMax;
    }

    this.updatePlotPoints();
    this.updateInsideList();

    if (typeof this.hist !== "undefined") {
      this.hist.setPlotPoints(this.plotPoints);
    }
  }
};

GLayer.prototype.setLimAndLog = function (...args) {
  var xMin, xMax, yMin, yMax, xLog, yLog;

  if (args.length === 6) {
    xMin = args[0];
    xMax = args[1];
    yMin = args[2];
    yMax = args[3];
    xLog = args[4];
    yLog = args[5];
  } else if (args.length === 4) {
    xMin = args[0][0];
    xMax = args[0][1];
    yMin = args[1][0];
    yMax = args[1][1];
    xLog = args[2];
    yLog = args[3];
  } else {
    throw new Error("GLayer.setLimAndLog(): signature not supported");
  }

  if (xMin !== xMax && yMin !== yMax && this.isValidNumber(xMin) && this.isValidNumber(xMax) && this.isValidNumber(yMin) && this.isValidNumber(yMax)) {
    // Make sure the new limits make sense
    if (xLog && (xMin <= 0 || xMax <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
    } else {
      this.xLim[0] = xMin;
      this.yLim[1] = xMax;
      this.xLog = xLog;
    }

    if (yLog && (yMin <= 0 || yMax <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
    } else {
      this.yLim[0] = yMin;
      this.yLim[1] = yMax;
      this.yLog = yLog;
    }

    this.updatePlotPoints();
    this.updateInsideList();

    if (typeof this.hist !== "undefined") {
      this.hist.setPlotPoints(this.plotPoints);
    }
  }
};

GLayer.prototype.setXLog = function (xLog) {
  if (xLog !== this.xLog) {
    if (xLog && (this.xLim[0] <= 0 || this.xLim[1] <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
      console.log("Will set horizontal limits to (0.1, 10)");
      this.xLim[0] = 0.1;
      this.xLim[1] = 10;
    }

    this.xLog = xLog;
    this.updatePlotPoints();
    this.updateInsideList();

    if (typeof this.hist !== "undefined") {
      this.hist.setPlotPoints(this.plotPoints);
    }
  }
};

GLayer.prototype.setYLog = function (yLog) {
  if (yLog !== this.yLog) {
    if (yLog && (this.yLim[0] <= 0 || this.yLim[1] <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
      console.log("Will set horizontal limits to (0.1, 10)");
      this.yLim[0] = 0.1;
      this.yLim[1] = 10;
    }

    this.yLog = yLog;
    this.updatePlotPoints();
    this.updateInsideList();

    if (typeof this.hist !== "undefined") {
      this.hist.setPlotPoints(this.plotPoints);
    }
  }
};

GLayer.prototype.setPoints = function (points) {
  var i;
  var nPoints = points.length;

  if (this.points.length > nPoints) {
    this.points.splice(nPoints, Number.MAX_VALUE);
  } else {
    for (i = this.points.length; i < nPoints; i++) {
      this.points[i] = new GPoint();
    }
  }

  for (i = 0; i < nPoints; i++) {
    this.points[i].set(points[i]);
  }

  this.updatePlotPoints();
  this.updateInsideList();

  if (typeof this.hist !== "undefined") {
    this.hist.setPlotPoints(this.plotPoints);
  }
};

GLayer.prototype.setPoint = function (...args) {
  var index, x, y, label;
  var nPoints = this.points.length;

  if (args.length === 4) {
    index = args[0];
    x = args[1];
    y = args[2];
    label = args[3];
  } else if (args.length === 3) {
    index = args[0];
    x = args[1];
    y = args[2];
    label = (index < nPoints) ? this.points[index].getLabel() : "";
  } else if (args.length === 2) {
    index = args[0];
    x = args[1].getX();
    y = args[1].getY();
    label = args[1].getLabel();
  } else {
    throw new Error("GLayer.setPoint(): signature not supported");
  }

  if (index < nPoints) {
    this.points[index].set(x, y, label);
    this.plotPoints[index].set(this.valueToXPlot(x), this.valueToYPlot(y), label);
    this.inside[index] = this.isInside(this.plotPoints[index]);
  } else if (index === nPoints) {
    this.points[index] = new GPoint(x, y, label);
    this.plotPoints[index] = new GPoint(this.valueToXPlot(x), this.valueToYPlot(y), label);
    this.inside[index] = this.isInside(this.plotPoints[index]);
  } else {
    throw new Error("GLayer.setPoint(): the index position is outside the array size");
  }

  if (typeof this.hist !== "undefined") {
    this.hist.setPlotPoint(index, this.plotPoints[index]);
  }
};

GLayer.prototype.addPoint = function (...args) {
  var x, y, label;

  if (args.length === 3) {
    x = args[0];
    y = args[1];
    label = args[2];
  } else if (args.length === 2) {
    x = args[0];
    y = args[1];
    label = "";
  } else if (args.length === 1) {
    x = args[0].getX();
    y = args[0].getY();
    label = args[0].getLabel();
  } else {
    throw new Error("GLayer.addPoint(): signature not supported");
  }

  this.points.push(new GPoint(x, y, label));
  this.plotPoints.push(new GPoint(this.valueToXPlot(x), this.valueToYPlot(y), label));
  this.inside.push(this.isInside(this.plotPoints[this.plotPoints.length - 1]));

  if (typeof this.hist !== "undefined") {
    this.hist.addPlotPoint(this.plotPoints[this.plotPoints.length - 1]);
  }
};

GLayer.prototype.addPoints = function (newPoints) {
  var newPoint;
  var nNewPoints = newPoints.length;

  for (var i = 0; i < nNewPoints; i++) {
    newPoint = newPoints[i];
    this.points.push(new GPoint(newPoint));
    this.plotPoints.push(new GPoint(this.valueToXPlot(newPoint.getX()), this.valueToYPlot(newPoint.getY()), newPoint.getLabel()));
    this.inside.push(this.isInside(this.plotPoints[this.plotPoints.length - 1]));
  }

  if (typeof this.hist !== "undefined") {
    this.hist.setPlotPoints(this.plotPoints);
  }
};

GLayer.prototype.addPointAtIndexPos = function (...args) {
  var index, x, y, label;

  if (args.length === 4) {
    index = args[0];
    x = args[1];
    y = args[2];
    label = args[3];
  } else if (args.length === 3) {
    index = args[0];
    x = args[1];
    y = args[2];
    label = "";
  } else if (args.length === 2) {
    index = args[0];
    x = args[1].getX();
    y = args[1].getY();
    label = args[1].getLabel();
  } else {
    throw new Error("GLayer.addPointAtIndexPos(): signature not supported");
  }

  if (index <= this.points.length) {
    this.points.splice(index, 0, new GPoint(x, y, label));
    this.plotPoints.splice(index, 0, new GPoint(this.valueToXPlot(x), this.valueToYPlot(y), label));
    this.inside.splice(index, 0, this.isInside(this.plotPoints[index]));

    if (typeof this.hist !== "undefined") {
      this.hist.setPlotPoints(this.plotPoints);
    }
  }
};

GLayer.prototype.removePoint = function (index) {
  if (index < this.points.length) {
    this.points.splice(index, 1);
    this.plotPoints.splice(index, 1);
    this.inside.splice(index, 1);

    if (typeof this.hist !== "undefined") {
      this.hist.removePlotPoint(index);
    }
  }
};

GLayer.prototype.setInside = function (inside) {
  if (inside.length === this.inside.length) {
    this.inside = inside.slice();
  }
};

GLayer.prototype.setPointColors = function (pointColors) {
  if (pointColors.length > 0) {
    this.pointColors = pointColors.slice();
  }
};

GLayer.prototype.setPointColor = function (pointColor) {
  this.pointColors = [pointColor];
};

GLayer.prototype.setPointSizes = function (pointSizes) {
  if (pointSizes.length > 0) {
    this.pointSizes = pointSizes.slice();
  }
};

GLayer.prototype.setPointSize = function (pointSize) {
  this.pointSizes = [pointSize];
};

GLayer.prototype.setLineColor = function (lineColor) {
  this.lineColor = lineColor;
};

GLayer.prototype.setLineWidth = function (lineWidth) {
  if (lineWidth > 0) {
    this.lineWidth = lineWidth;
  }
};

GLayer.prototype.setHistBasePoint = function (histBasePoint) {
  this.histBasePoint.set(histBasePoint);
};

GLayer.prototype.setHistType = function (histType) {
  if (typeof this.hist !== "undefined") {
    this.hist.setType(histType);
  }
};

GLayer.prototype.setHistVisible = function (visible) {
  if (typeof this.hist !== "undefined") {
    this.hist.setVisible(visible);
  }
};

GLayer.prototype.setDrawHistLabels = function (drawHistLabels) {
  if (typeof this.hist !== "undefined") {
    this.hist.setDrawLabels(drawHistLabels);
  }
};

GLayer.prototype.setLabelBgColor = function (labelBgColor) {
  this.labelBgColor = labelBgColor;
};

GLayer.prototype.setLabelSeparation = function (labelSeparation) {
  this.labelSeparation[0] = labelSeparation[0];
  this.labelSeparation[1] = labelSeparation[1];
};

GLayer.prototype.setFontName = function (fontName) {
  this.fontName = fontName;
};

GLayer.prototype.setFontColor = function (fontColor) {
  this.fontColor = fontColor;
};

GLayer.prototype.setFontSize = function (fontSize) {
  if (fontSize > 0) {
    this.fontSize = fontSize;
  }
};

GLayer.prototype.setFontProperties = function (fontName, fontColor, fontSize) {
  if (fontSize > 0) {
    this.fontName = fontName;
    this.fontColor = fontColor;
    this.fontSize = fontSize;
  }
};

GLayer.prototype.setAllFontProperties = function (fontName, fontColor, fontSize) {
  this.setFontProperties(fontName, fontColor, fontSize);

  if (typeof this.hist !== "undefined") {
    this.hist.setFontProperties(fontName, fontColor, fontSize);
  }
};

GLayer.prototype.getId = function () {
  return this.id;
};

GLayer.prototype.getDim = function () {
  return this.dim.slice();
};

GLayer.prototype.getXLim = function () {
  return this.xLim.slice();
};

GLayer.prototype.getYLim = function () {
  return this.yLim.slice();
};

GLayer.prototype.getXLog = function () {
  return this.xLog;
};

GLayer.prototype.getYLog = function () {
  return this.yLog;
};

GLayer.prototype.getPoints = function () {
  var points = [];

  for (var i = 0; i < this.points.length; i++) {
    points[i] = new GPoint(this.points[i]);
  }

  return points;
};

GLayer.prototype.getPointsRef = function () {
  return this.points;
};

GLayer.prototype.getPointColors = function () {
  return this.pointColors.slice();
};

GLayer.prototype.getPointSizes = function () {
  return this.pointSizes.slice();
};

GLayer.prototype.getLineColor = function () {
  return this.lineColor;
};

GLayer.prototype.getLineWidth = function () {
  return this.lineWidth;
};

GLayer.prototype.getHistogram = function () {
  return this.hist;
};
/*
 * Plot class. It controls the rest of the graphical elements (layers, axes,
 * title, limits).
 */
class GPlot {
  constructor(...args) {
    var parent, xPos, yPos, plotWidth, plotHeight;

    if (args.length === 5) {
      parent = args[0];
      xPos = args[1];
      yPos = args[2];
      plotWidth = args[3];
      plotHeight = args[4];
    } else if (args.length === 3) {
      parent = args[0];
      xPos = args[1];
      yPos = args[2];
      plotWidth = 450;
      plotHeight = 300;
    } else if (args.length === 1) {
      parent = args[0];
      xPos = 0;
      yPos = 0;
      plotWidth = 450;
      plotHeight = 300;
    } else {
      throw new Error("GPlot constructor: signature not supported");
    }

    // The parent processing object
    this.parent = parent;
    this.parentElt = this.parent._renderer.elt;

    // General properties
    this.pos = [xPos, yPos];
    this.outerDim = [plotWidth, plotHeight];
    this.mar = [60, 70, 40, 30];
    this.dim = [this.outerDim[0] - this.mar[1] - this.mar[3], this.outerDim[1] - this.mar[0] - this.mar[2]];
    this.xLim = [0, 1];
    this.yLim = [0, 1];
    this.fixedXLim = false;
    this.fixedYLim = false;
    this.xLog = false;
    this.yLog = false;
    this.invertedXScale = false;
    this.invertedYScale = false;
    this.includeAllLayersInLim = true;
    this.expandLimFactor = 0.1;

    // Format properties
    this.bgColor = this.parent.color(255);
    this.boxBgColor = this.parent.color(245);
    this.boxLineColor = this.parent.color(210);
    this.boxLineWidth = 1;
    this.gridLineColor = this.parent.color(210);
    this.gridLineWidth = 1;

    // Layers
    this.mainLayer = new GLayer(this.parent, GPlot.MAINLAYERID, this.dim, this.xLim, this.yLim, this.xLog, this.yLog);
    this.layerList = [];

    // Axes and title
    this.xAxis = new GAxis(this.parent, this.parent.BOTTOM, this.dim, this.xLim, this.xLog);
    this.topAxis = new GAxis(this.parent, this.parent.TOP, this.dim, this.xLim, this.xLog);
    this.yAxis = new GAxis(this.parent, this.parent.LEFT, this.dim, this.yLim, this.yLog);
    this.rightAxis = new GAxis(this.parent, this.parent.RIGHT, this.dim, this.yLim, this.yLog);
    this.title = new GTitle(this.parent, this.dim);

    // Setup for the mouse events
    this.zoomingIsActive = false;
    this.zoomFactor = 1.3;
    this.increaseZoomButton = this.parent.LEFT;
    this.decreaseZoomButton = this.parent.RIGHT;
    this.increaseZoomKeyModifier = GPlot.NONE;
    this.decreaseZoomKeyModifier = GPlot.NONE;
    this.centeringIsActive = false;
    this.centeringButton = this.parent.LEFT;
    this.centeringKeyModifier = GPlot.NONE;
    this.panningIsActive = false;
    this.panningButton = this.parent.LEFT;
    this.panningKeyModifier = GPlot.NONE;
    this.panningReferencePoint = undefined;
    this.panningIntervalId = undefined;
    this.labelingIsActive = false;
    this.labelingButton = this.parent.LEFT;
    this.labelingKeyModifier = GPlot.NONE;
    this.mousePos = undefined;
    this.resetIsActive = false;
    this.resetButton = this.parent.RIGHT;
    this.resetKeyModifier = this.parent.CONTROL;
    this.xLimReset = undefined;
    this.yLimReset = undefined;

    // Add the event listeners
    this.clickListener = this.clickEvent.bind(this);
    this.wheelListener = this.wheelEvent.bind(this);
    this.mouseDownListener = this.mouseDownEvent.bind(this);
    this.mouseMoveListener = this.mouseMoveEvent.bind(this);
    this.mouseUpListener = this.mouseUpEvent.bind(this);
    this.touchStartListener = this.touchStartEvent.bind(this);
    this.touchMoveListener = this.touchMoveEvent.bind(this);
    this.touchEndListener = this.touchEndEvent.bind(this);
    this.parentElt.addEventListener("click", this.clickListener, false);
    this.parentElt.addEventListener("wheel", this.wheelListener, false);
    this.parentElt.addEventListener("mousedown", this.mouseDownListener, false);
    this.parentElt.addEventListener("touchstart", this.touchStartListener, false);
  }
};

// Constants
GPlot.MAINLAYERID = "main layer";
GPlot.VERTICAL = 0;
GPlot.HORIZONTAL = 1;
GPlot.BOTH = 2;
GPlot.NONE = 0;

GPlot.prototype.addLayer = function (...args) {
  var id, layer;

  if (args.length === 2) {
    id = args[0];
    layer = new GLayer(this.parent, id, this.dim, this.xLim, this.yLim, this.xLog, this.yLog);
    layer.setPoints(args[1]);
  } else if (args.length === 1) {
    id = args[0].getId();
    layer = args[0];
  } else {
    throw new Error("GPlot.addLayer(): signature not supported");
  }

  // Check that it is the only layer with that id
  var sameId = false;

  if (this.mainLayer.isId(id)) {
    sameId = true;
  } else {
    for (var i = 0; i < this.layerList.length; i++) {
      if (this.layerList[i].isId(id)) {
        sameId = true;
        break;
      }
    }
  }

  // Add the layer to the list
  if (!sameId) {
    layer.setDim(this.dim);
    layer.setLimAndLog(this.xLim, this.yLim, this.xLog, this.yLog);
    this.layerList.push(layer);

    // Calculate and update the new plot limits if necessary
    if (this.includeAllLayersInLim) {
      this.updateLimits();
    }
  } else {
    console.log("A layer with the same id exists. Please change the id and try to add it again.");
  }
};

GPlot.prototype.removeLayer = function (id) {
  var index;

  for (var i = 0; i < this.layerList.length; i++) {
    if (this.layerList[i].isId(id)) {
      index = i;
      break;
    }
  }

  if (typeof index !== "undefined") {
    this.layerList.splice(index, 1);

    // Calculate and update the new plot limits if necessary
    if (this.includeAllLayersInLim) {
      this.updateLimits();
    }
  } else {
    console.log("Couldn't find a layer in the plot with id = " + id);
  }
};

GPlot.prototype.getPlotPosAt = function (xScreen, yScreen) {
  var xPlot = xScreen - (this.pos[0] + this.mar[1]);
  var yPlot = yScreen - (this.pos[1] + this.mar[2] + this.dim[1]);

  return [xPlot, yPlot];
};

GPlot.prototype.getScreenPosAtValue = function (xValue, yValue) {
  var xScreen = this.mainLayer.valueToXPlot(xValue) + (this.pos[0] + this.mar[1]);
  var yScreen = this.mainLayer.valueToYPlot(yValue) + (this.pos[1] + this.mar[2] + this.dim[1]);

  return [xScreen, yScreen];
};

GPlot.prototype.getPointAt = function (...args) {
  var xScreen, yScreen, layer;

  if (args.length === 3) {
    xScreen = args[0];
    yScreen = args[1];
    layer = this.getLayer(args[2]);
  } else if (args.length === 2) {
    xScreen = args[0];
    yScreen = args[1];
    layer = this.mainLayer;
  } else {
    throw new Error("GPlot.getPointAt(): signature not supported");
  }

  var plotPos = this.getPlotPosAt(xScreen, yScreen);
  return layer.getPointAtPlotPos(plotPos[0], plotPos[1]);
};

GPlot.prototype.addPointAt = function (...args) {
  var xScreen, yScreen, layerId;

  if (args.length === 3) {
    xScreen = args[0];
    yScreen = args[1];
    layerId = args[2];
  } else if (args.length === 2) {
    xScreen = args[0];
    yScreen = args[1];
    layerId = GPlot.MAINLAYERID;
  } else {
    throw new Error("GPlot.addPointAt(): signature not supported");
  }

  var value = this.getValueAt(xScreen, yScreen);
  this.addPoint(value[0], value[1], "", layerId);
};

GPlot.prototype.removePointAt = function (...args) {
  var xScreen, yScreen, layerId;

  if (args.length === 3) {
    xScreen = args[0];
    yScreen = args[1];
    layerId = args[2];
  } else if (args.length === 2) {
    xScreen = args[0];
    yScreen = args[1];
    layerId = GPlot.MAINLAYERID;
  } else {
    throw new Error("GPlot.removePointAt(): signature not supported");
  }

  var plotPos = this.getPlotPosAt(xScreen, yScreen);
  var pointIndex = this.getLayer(layerId).getPointIndexAtPlotPos(plotPos[0], plotPos[1]);

  if (typeof pointIndex !== "undefined") {
    this.removePoint(pointIndex, layerId);
  }
};

GPlot.prototype.getValueAt = function (xScreen, yScreen) {
  var plotPos = this.getPlotPosAt(xScreen, yScreen);
  return this.mainLayer.plotToValue(plotPos[0], plotPos[1]);
};

GPlot.prototype.getRelativePlotPosAt = function (xScreen, yScreen) {
  var plotPos = this.getPlotPosAt(xScreen, yScreen);
  return [plotPos[0] / this.dim[0], -plotPos[1] / this.dim[1]];
};

GPlot.prototype.isOverPlot = function (...args) {
  var xScreen, yScreen;

  if (args.length === 2) {
    xScreen = args[0];
    yScreen = args[1];
  } else if (args.length === 0) {
    xScreen = this.parent.mouseX;
    yScreen = this.parent.mouseY;
  } else {
    throw new Error("GPlot.isOverPlot(): signature not supported");
  }

  return (xScreen >= this.pos[0]) && (xScreen <= this.pos[0] + this.outerDim[0]) && (yScreen >= this.pos[1]) && (yScreen <= this.pos[1] + this.outerDim[1]);
};

GPlot.prototype.isOverBox = function (...args) {
  var xScreen, yScreen;

  if (args.length === 2) {
    xScreen = args[0];
    yScreen = args[1];
  } else if (args.length === 0) {
    xScreen = this.parent.mouseX;
    yScreen = this.parent.mouseY;
  } else {
    throw new Error("GPlot.isOverBox(): signature not supported");
  }

  return (xScreen >= this.pos[0] + this.mar[1]) && (xScreen <= this.pos[0] + this.outerDim[0] - this.mar[3]) && (yScreen >= this.pos[1] + this.mar[2]) && (yScreen <= this.pos[1] + this.outerDim[1] - this.mar[0]);
};

GPlot.prototype.updateLimits = function () {
  // Calculate the new limits and update the axes if needed
  if (!this.fixedXLim) {
    this.xLim = this.calculatePlotXLim();
    this.xAxis.setLim(this.xLim);
    this.topAxis.setLim(this.xLim);
  }

  if (!this.fixedYLim) {
    this.yLim = this.calculatePlotYLim();
    this.yAxis.setLim(this.yLim);
    this.rightAxis.setLim(this.yLim);
  }

  // Update the layers
  this.mainLayer.setXYLim(this.xLim, this.yLim);

  for (var i = 0; i < this.layerList.length; i++) {
    this.layerList[i].setXYLim(this.xLim, this.yLim);
  }
};

GPlot.prototype.calculatePlotXLim = function () {
  // Find the limits for the main layer
  var lim = this.calculatePointsXLim(this.mainLayer.getPointsRef());

  // Include the other layers in the limit calculation if necessary
  if (this.includeAllLayersInLim) {
    for (var i = 0; i < this.layerList.length; i++) {
      var newLim = this.calculatePointsXLim(this.layerList[i].getPointsRef());

      if (typeof newLim !== "undefined") {
        if (typeof lim !== "undefined") {
          lim[0] = Math.min(lim[0], newLim[0]);
          lim[1] = Math.max(lim[1], newLim[1]);
        } else {
          lim = newLim;
        }
      }
    }
  }

  if (typeof lim !== "undefined") {
    // Expand the axis limits a bit
    var delta = (lim[0] === 0) ? 0.1 : 0.1 * lim[0];

    if (this.xLog) {
      if (lim[0] !== lim[1]) {
        delta = Math.exp(this.expandLimFactor * Math.log(lim[1] / lim[0]));
      }

      lim[0] = lim[0] / delta;
      lim[1] = lim[1] * delta;
    } else {
      if (lim[0] !== lim[1]) {
        delta = this.expandLimFactor * (lim[1] - lim[0]);
      }

      lim[0] = lim[0] - delta;
      lim[1] = lim[1] + delta;
    }
  } else {
    if (this.xLog && (this.xLim[0] <= 0 || this.xLim[1] <= 0)) {
      lim = [0.1, 10];
    } else {
      lim = this.xLim.slice();
    }
  }

  // Invert the limits if necessary
  if (this.invertedXScale && lim[0] < lim[1]) {
    lim = [lim[1], lim[0]];
  }

  return lim;
};

GPlot.prototype.calculatePlotYLim = function () {
  // Find the limits for the main layer
  var lim = this.calculatePointsYLim(this.mainLayer.getPointsRef());

  // Include the other layers in the limit calculation if necessary
  if (this.includeAllLayersInLim) {
    for (var i = 0; i < this.layerList.length; i++) {
      var newLim = this.calculatePointsYLim(this.layerList[i].getPointsRef());

      if (typeof newLim !== "undefined") {
        if (typeof lim !== "undefined") {
          lim[0] = Math.min(lim[0], newLim[0]);
          lim[1] = Math.max(lim[1], newLim[1]);
        } else {
          lim = newLim;
        }
      }
    }
  }

  if (typeof lim !== "undefined") {
    // Expand the axis limits a bit
    var delta = (lim[0] === 0) ? 0.1 : 0.1 * lim[0];

    if (this.yLog) {
      if (lim[0] !== lim[1]) {
        delta = Math.exp(this.expandLimFactor * Math.log(lim[1] / lim[0]));
      }

      lim[0] = lim[0] / delta;
      lim[1] = lim[1] * delta;
    } else {
      if (lim[0] !== lim[1]) {
        delta = this.expandLimFactor * (lim[1] - lim[0]);
      }

      lim[0] = lim[0] - delta;
      lim[1] = lim[1] + delta;
    }
  } else {
    if (this.yLog && (this.yLim[0] <= 0 || this.yLim[1] <= 0)) {
      lim = [0.1, 10];
    } else {
      lim = this.yLim.slice();
    }
  }

  // Invert the limits if necessary
  if (this.invertedYScale && lim[0] < lim[1]) {
    lim = [lim[1], lim[0]];
  }

  return lim;
};

GPlot.prototype.calculatePointsXLim = function (points) {
  // Find the points limits
  var lim = [Number.MAX_VALUE, -Number.MAX_VALUE];

  for (var i = 0; i < points.length; i++) {
    if (points[i].isValid()) {
      // Use the point if it's inside, and it's not negative if
      // the scale is logarithmic
      var x = points[i].getX();
      var y = points[i].getY();
      var isInside = true;

      if (this.fixedYLim) {
        isInside = ((this.yLim[1] >= this.yLim[0]) && (y >= this.yLim[0]) && (y <= this.yLim[1])) || ((this.yLim[1] < this.yLim[0]) && (y <= this.yLim[0]) && (y >= this.yLim[1]));
      }

      if (isInside && !(this.xLog && x <= 0)) {
        if (x < lim[0]) {
          lim[0] = x;
        }

        if (x > lim[1]) {
          lim[1] = x;
        }
      }
    }
  }

  // Check that the new limits make sense
  if (lim[1] < lim[0]) {
    lim = undefined;
  }

  return lim;
};

GPlot.prototype.calculatePointsYLim = function (points) {
  // Find the points limits
  var lim = [Number.MAX_VALUE, -Number.MAX_VALUE];

  for (var i = 0; i < points.length; i++) {
    if (points[i].isValid()) {
      // Use the point if it's inside, and it's not negative if
      // the scale is logarithmic
      var x = points[i].getX();
      var y = points[i].getY();
      var isInside = true;

      if (this.fixedXLim) {
        isInside = ((this.xLim[1] >= this.xLim[0]) && (x >= this.xLim[0]) && (x <= this.xLim[1])) || ((this.xLim[1] < this.xLim[0]) && (x <= this.xLim[0]) && (x >= this.xLim[1]));
      }

      if (isInside && !(this.yLog && y <= 0)) {
        if (y < lim[0]) {
          lim[0] = y;
        }
        if (y > lim[1]) {
          lim[1] = y;
        }
      }
    }
  }

  // Check that the new limits make sense
  if (lim[1] < lim[0]) {
    lim = undefined;
  }

  return lim;
};

GPlot.prototype.moveHorizontalAxesLim = function (delta) {
  // Obtain the new x limits
  var deltaLim;

  if (this.xLog) {
    deltaLim = Math.exp(Math.log(this.xLim[1] / this.xLim[0]) * delta / this.dim[0]);
    this.xLim[0] *= deltaLim;
    this.xLim[1] *= deltaLim;
  } else {
    deltaLim = (this.xLim[1] - this.xLim[0]) * delta / this.dim[0];
    this.xLim[0] += deltaLim;
    this.xLim[1] += deltaLim;
  }

  // Fix the limits
  this.fixedXLim = true;
  this.fixedYLim = true;

  // Move the horizontal axes
  this.xAxis.moveLim(this.xLim);
  this.topAxis.moveLim(this.xLim);

  // Update the plot limits
  this.updateLimits();
};

GPlot.prototype.moveVerticalAxesLim = function (delta) {
  // Obtain the new y limits
  var deltaLim;

  if (this.yLog) {
    deltaLim = Math.exp(Math.log(this.yLim[1] / this.yLim[0]) * delta / this.dim[1]);
    this.yLim[0] *= deltaLim;
    this.yLim[1] *= deltaLim;
  } else {
    deltaLim = (this.yLim[1] - this.yLim[0]) * delta / this.dim[1];
    this.yLim[0] += deltaLim;
    this.yLim[1] += deltaLim;
  }

  // Fix the limits
  this.fixedXLim = true;
  this.fixedYLim = true;

  // Move the vertical axes
  this.yAxis.moveLim(this.yLim);
  this.rightAxis.moveLim(this.yLim);

  // Update the plot limits
  this.updateLimits();
};

GPlot.prototype.centerAndZoom = function (factor, xValue, yValue) {
  // Calculate the new limits
  var deltaLim;

  if (this.xLog) {
    deltaLim = Math.exp(Math.log(this.xLim[1] / this.xLim[0]) / (2 * factor));
    this.xLim = [xValue / deltaLim, xValue * deltaLim];
  } else {
    deltaLim = (this.xLim[1] - this.xLim[0]) / (2 * factor);
    this.xLim = [xValue - deltaLim, xValue + deltaLim];
  }

  if (this.yLog) {
    deltaLim = Math.exp(Math.log(this.yLim[1] / this.yLim[0]) / (2 * factor));
    this.yLim = [yValue / deltaLim, yValue * deltaLim];
  } else {
    deltaLim = (this.yLim[1] - this.yLim[0]) / (2 * factor);
    this.yLim = [yValue - deltaLim, yValue + deltaLim];
  }

  // Fix the limits
  this.fixedXLim = true;
  this.fixedYLim = true;

  // Update the horizontal and vertical axes
  this.xAxis.setLim(this.xLim);
  this.topAxis.setLim(this.xLim);
  this.yAxis.setLim(this.yLim);
  this.rightAxis.setLim(this.yLim);

  // Update the plot limits (the layers, because the limits are fixed)
  this.updateLimits();
};

GPlot.prototype.zoom = function (...args) {
  var factor, deltaLim, offset;

  if (args.length === 3) {
    factor = args[0];
    var xScreen = args[1];
    var yScreen = args[2];

    var plotPos = this.getPlotPosAt(xScreen, yScreen);
    var value = this.mainLayer.plotToValue(plotPos[0], plotPos[1]);

    if (this.xLog) {
      deltaLim = Math.exp(Math.log(this.xLim[1] / this.xLim[0]) / (2 * factor));
      offset = Math.exp((Math.log(this.xLim[1] / this.xLim[0]) / factor) * (0.5 - plotPos[0] / this.dim[0]));
      this.xLim = [value[0] * offset / deltaLim, value[0] * offset * deltaLim];
    } else {
      deltaLim = (this.xLim[1] - this.xLim[0]) / (2 * factor);
      offset = 2 * deltaLim * (0.5 - plotPos[0] / this.dim[0]);
      this.xLim = [value[0] + offset - deltaLim, value[0] + offset + deltaLim];
    }

    if (this.yLog) {
      deltaLim = Math.exp(Math.log(this.yLim[1] / this.yLim[0]) / (2 * factor));
      offset = Math.exp((Math.log(this.yLim[1] / this.yLim[0]) / factor) * (0.5 + plotPos[1] / this.dim[1]));
      this.yLim = [value[1] * offset / deltaLim, value[1] * offset * deltaLim];
    } else {
      deltaLim = (this.yLim[1] - this.yLim[0]) / (2 * factor);
      offset = 2 * deltaLim * (0.5 + plotPos[1] / this.dim[1]);
      this.yLim = [value[1] + offset - deltaLim, value[1] + offset + deltaLim];
    }

    // Fix the limits
    this.fixedXLim = true;
    this.fixedYLim = true;

    // Update the horizontal and vertical axes
    this.xAxis.setLim(this.xLim);
    this.topAxis.setLim(this.xLim);
    this.yAxis.setLim(this.yLim);
    this.rightAxis.setLim(this.yLim);

    // Update the plot limits (the layers, because the limits are fixed)
    this.updateLimits();
  } else if (args.length === 1) {
    factor = args[0];
    var centerValue = this.mainLayer.plotToValue(this.dim[0] / 2, -this.dim[1] / 2);
    this.centerAndZoom(factor, centerValue[0], centerValue[1]);
  } else {
    throw new Error("GPlot.zoom(): signature not supported");
  }
};

GPlot.prototype.shiftPlotPos = function (valuePlotPos, newPlotPos) {
  // Calculate the new limits
  var deltaLim;
  var deltaXPlot = valuePlotPos[0] - newPlotPos[0];
  var deltaYPlot = valuePlotPos[1] - newPlotPos[1];

  if (this.xLog) {
    deltaLim = Math.exp(Math.log(this.xLim[1] / this.xLim[0]) * deltaXPlot / this.dim[0]);
    this.xLim = [this.xLim[0] * deltaLim, this.xLim[1] * deltaLim];
  } else {
    deltaLim = (this.xLim[1] - this.xLim[0]) * deltaXPlot / this.dim[0];
    this.xLim = [this.xLim[0] + deltaLim, this.xLim[1] + deltaLim];
  }

  if (this.yLog) {
    deltaLim = Math.exp(-Math.log(this.yLim[1] / this.yLim[0]) * deltaYPlot / this.dim[1]);
    this.yLim = [this.yLim[0] * deltaLim, this.yLim[1] * deltaLim];
  } else {
    deltaLim = -(this.yLim[1] - this.yLim[0]) * deltaYPlot / this.dim[1];
    this.yLim = [this.yLim[0] + deltaLim, this.yLim[1] + deltaLim];
  }

  // Fix the limits
  this.fixedXLim = true;
  this.fixedYLim = true;

  // Move the horizontal and vertical axes
  this.xAxis.moveLim(this.xLim);
  this.topAxis.moveLim(this.xLim);
  this.yAxis.moveLim(this.yLim);
  this.rightAxis.moveLim(this.yLim);

  // Update the plot limits (the layers, because the limits are fixed)
  this.updateLimits();
};

GPlot.prototype.align = function (...args) {
  var xValue, yValue, xScreen, yScreen;

  if (args.length === 4) {
    xValue = args[0];
    yValue = args[1];
    xScreen = args[2];
    yScreen = args[3];
  } else if (args.length === 3) {
    xValue = args[0][0];
    yValue = args[0][1];
    xScreen = args[1];
    yScreen = args[2];
  } else {
    throw new Error("GPlot.align(): signature not supported");
  }

  var valuePlotPos = this.mainLayer.valueToPlot(xValue, yValue);
  var newPlotPos = this.getPlotPosAt(xScreen, yScreen);
  this.shiftPlotPos(valuePlotPos, newPlotPos);
};

GPlot.prototype.center = function (xScreen, yScreen) {
  var valuePlotPos = this.getPlotPosAt(xScreen, yScreen);
  var newPlotPos = [this.dim[0] / 2, -this.dim[1] / 2];
  this.shiftPlotPos(valuePlotPos, newPlotPos);
};

GPlot.prototype.startHistograms = function (histType) {
  this.mainLayer.startHistogram(histType);

  for (var i = 0; i < this.layerList.length; i++) {
    this.layerList[i].startHistogram(histType);
  }
};

GPlot.prototype.defaultDraw = function () {
  this.beginDraw();
  this.drawBackground();
  this.drawBox();
  this.drawXAxis();
  this.drawYAxis();
  this.drawTitle();
  this.drawLines();
  this.drawPoints();
  this.endDraw();
};

GPlot.prototype.beginDraw = function () {
  this.parent.push();
  this.parent.translate(this.pos[0] + this.mar[1], this.pos[1] + this.mar[2] + this.dim[1]);
};

GPlot.prototype.endDraw = function () {
  this.parent.pop();
};

GPlot.prototype.drawBackground = function () {
  this.parent.push();
  this.parent.rectMode(this.parent.CORNER);
  this.parent.fill(this.bgColor);
  this.parent.noStroke();
  this.parent.rect(-this.mar[1], -this.mar[2] - this.dim[1], this.outerDim[0], this.outerDim[1]);
  this.parent.pop();
};

GPlot.prototype.drawBox = function () {
  this.parent.push();
  this.parent.rectMode(this.parent.CORNER);
  this.parent.fill(this.boxBgColor);
  this.parent.stroke(this.boxLineColor);
  this.parent.strokeWeight(this.boxLineWidth);
  this.parent.strokeCap(this.parent.SQUARE);
  this.parent.rect(0, -this.dim[1], this.dim[0], this.dim[1]);
  this.parent.pop();
};

GPlot.prototype.drawXAxis = function () {
  this.xAxis.draw();
};

GPlot.prototype.drawYAxis = function () {
  this.yAxis.draw();
};

GPlot.prototype.drawTopAxis = function () {
  this.topAxis.draw();
};

GPlot.prototype.drawRightAxis = function () {
  this.rightAxis.draw();
};

GPlot.prototype.drawTitle = function () {
  this.title.draw();
};

GPlot.prototype.drawPoints = function () {
  var i;

  if (args.length === 1) {
    this.mainLayer.drawPoints(args[0]);

    for (i = 0; i < this.layerList.length; i++) {
      this.layerList[0].drawPoints(args[0]);
    }
  } else if (args.length === 0) {
    this.mainLayer.drawPoints();

    for (i = 0; i < this.layerList.length; i++) {
      this.layerList[i].drawPoints();
    }
  } else {
    throw new Error("GPlot.drawPoints(): signature not supported");
  }
};

GPlot.prototype.drawPoint = function (...args) {
  if (args.length === 3) {
    this.mainLayer.drawPoint(args[0], args[1], args[2]);
  } else if (args.length === 2) {
    this.mainLayer.drawPoint(args[0], args[1]);
  } else if (args.length === 1) {
    this.mainLayer.drawPoint(args[0]);
  } else {
    throw new Error("GPlot.drawPoint(): signature not supported");
  }
};

GPlot.prototype.drawLines = function () {
  this.mainLayer.drawLines();

  for (var i = 0; i < this.layerList.length; i++) {
    this.layerList[i].drawLines();
  }
};

GPlot.prototype.drawLine = function (...args) {
  if (args.length === 4) {
    this.mainLayer.drawLine(args[0], args[1], args[2], args[3]);
  } else if (args.length === 2) {
    this.mainLayer.drawLine(args[0], args[1]);
  } else {
    throw new Error("GPlot.drawLine(): signature not supported");
  }
};

GPlot.prototype.drawHorizontalLine = function (...args) {
  if (args.length === 3) {
    this.mainLayer.drawHorizontalLine(args[0], args[1], args[2]);
  } else if (args.length === 1) {
    this.mainLayer.drawHorizontalLine(args[0]);
  } else {
    throw new Error("GPlot.drawHorizontalLine(): signature not supported");
  }
};

GPlot.prototype.drawVerticalLine = function (...args) {
  if (args.length === 3) {
    this.mainLayer.drawVerticalLine(args[0], args[1], args[2]);
  } else if (args.length === 1) {
    this.mainLayer.drawVerticalLine(args[0]);
  } else {
    throw new Error("GPlot.drawVerticalLine(): signature not supported");
  }
};

GPlot.prototype.drawFilledContours = function (contourType, referenceValue) {
  this.mainLayer.drawFilledContour(contourType, referenceValue);

  for (var i = 0; i < this.layerList.length; i++) {
    this.layerList[i].drawFilledContour(contourType, referenceValue);
  }
};

GPlot.prototype.drawLabel = function (point) {
  this.mainLayer.drawLabel(point);
};

GPlot.prototype.drawLabelsAt = function (xScreen, yScreen) {
  var plotPos = this.getPlotPosAt(xScreen, yScreen);
  this.mainLayer.drawLabelAtPlotPos(plotPos[0], plotPos[1]);

  for (var i = 0; i < this.layerList.length; i++) {
    this.layerList[i].drawLabelAtPlotPos(plotPos[0], plotPos[1]);
  }
};

GPlot.prototype.drawLabels = function () {
  if (this.labelingIsActive && typeof this.mousePos !== "undefined") {
    this.drawLabelsAt(this.mousePos[0], this.mousePos[1]);
  }
};

GPlot.prototype.drawGridLines = function (gridType) {
  var i;

  this.parent.push();
  this.parent.noFill();
  this.parent.stroke(this.gridLineColor);
  this.parent.strokeWeight(this.gridLineWidth);
  this.parent.strokeCap(this.parent.SQUARE);

  if (gridType === GPlot.BOTH || gridType === GPlot.VERTICAL) {
    var xPlotTicks = this.xAxis.getPlotTicksRef();

    for (i = 0; i < xPlotTicks.length; i++) {
      if (xPlotTicks[i] >= 0 && xPlotTicks[i] <= this.dim[0]) {
        this.parent.line(xPlotTicks[i], 0, xPlotTicks[i], -this.dim[1]);
      }
    }
  }

  if (gridType === GPlot.BOTH || gridType === GPlot.HORIZONTAL) {
    var yPlotTicks = this.yAxis.getPlotTicksRef();

    for (i = 0; i < yPlotTicks.length; i++) {
      if (-yPlotTicks[i] >= 0 && -yPlotTicks[i] <= this.dim[1]) {
        this.parent.line(0, yPlotTicks[i], this.dim[0], yPlotTicks[i]);
      }
    }
  }

  this.parent.pop();
};

GPlot.prototype.drawHistograms = function () {
  this.mainLayer.drawHistogram();

  for (var i = 0; i < this.layerList.length; i++) {
    this.layerList[i].drawHistogram();
  }
};

GPlot.prototype.drawPolygon = function (polygonPoints, polygonColor) {
  this.mainLayer.drawPolygon(polygonPoints, polygonColor);
};

GPlot.prototype.drawAnnotation = function (text, x, y, horAlign, verAlign) {
  this.mainLayer.drawAnnotation(text, x, y, horAlign, verAlign);
};

GPlot.prototype.drawLegend = function (text, xRelativePos, yRelativePos) {
  var rectSize = 14;

  this.parent.push();
  this.parent.rectMode(this.parent.CENTER);
  this.parent.noStroke();

  for (var i = 0; i < text.length; i++) {
    var plotPosition = [xRelativePos[i] * this.dim[0], -yRelativePos[i] * this.dim[1]];
    var position = this.mainLayer.plotToValue(plotPosition[0] + rectSize, plotPosition[1]);

    if (i === 0) {
      this.parent.fill(this.mainLayer.getLineColor());
      this.parent.rect(plotPosition[0], plotPosition[1], rectSize, rectSize);
      this.mainLayer.drawAnnotation(text[i], position[0], position[1], this.parent.LEFT, this.parent.CENTER);
    } else {
      this.parent.fill(this.layerList[i - 1].getLineColor());
      this.parent.rect(plotPosition[0], plotPosition[1], rectSize, rectSize);
      this.layerList[i - i].drawAnnotation(text[i], position[0], position[1], this.parent.LEFT, this.parent.CENTER);
    }
  }

  this.parent.pop();
};

GPlot.prototype.setPos = function (...args) {
  if (args.length === 2) {
    this.pos[0] = args[0];
    this.pos[1] = args[1];
  } else if (args.length === 1) {
    this.pos[0] = args[0][0];
    this.pos[1] = args[0][1];
  } else {
    throw new Error("GPlot.setPos(): signature not supported");
  }
};

GPlot.prototype.setOuterDim = function (...args) {
  var xOuterDim, yOuterDim;

  if (args.length === 2) {
    xOuterDim = args[0];
    yOuterDim = args[1];
  } else if (args.length === 1) {
    xOuterDim = args[0][0];
    yOuterDim = args[0][1];
  } else {
    throw new Error("GPlot.setOuterDim(): signature not supported");
  }

  if (xOuterDim > 0 && yOuterDim > 0) {
    // Make sure that the new plot dimensions are positive
    var xDim = xOuterDim - this.mar[1] - this.mar[3];
    var yDim = yOuterDim - this.mar[0] - this.mar[2];

    if (xDim > 0 && yDim > 0) {
      this.outerDim[0] = xOuterDim;
      this.outerDim[1] = yOuterDim;
      this.dim[0] = xDim;
      this.dim[1] = yDim;
      this.xAxis.setDim(this.dim);
      this.topAxis.setDim(this.dim);
      this.yAxis.setDim(this.dim);
      this.rightAxis.setDim(this.dim);
      this.title.setDim(this.dim);

      // Update the layers
      this.mainLayer.setDim(this.dim);

      for (var i = 0; i < this.layerList.lenght; i++) {
        this.layerList[i].setDim(this.dim);
      }
    }
  }
};

GPlot.prototype.setMar = function (...args) {
  var bottomMargin, leftMargin, topMargin, rightMargin;

  if (args.length === 4) {
    bottomMargin = args[0];
    leftMargin = args[1];
    topMargin = args[2];
    rightMargin = args[3];
  } else if (args.length === 1) {
    bottomMargin = args[0][0];
    leftMargin = args[0][1];
    topMargin = args[0][2];
    rightMargin = args[0][3];
  } else {
    throw new Error("GPlot.setMar(): signature not supported");
  }

  var xOuterDim = this.dim[0] + leftMargin + rightMargin;
  var yOuterDim = this.dim[1] + bottomMargin + topMargin;

  if (xOuterDim > 0 && yOuterDim > 0) {
    this.mar[0] = bottomMargin;
    this.mar[1] = leftMargin;
    this.mar[2] = topMargin;
    this.mar[3] = rightMargin;
    this.outerDim[0] = xOuterDim;
    this.outerDim[1] = yOuterDim;
  }
};

GPlot.prototype.setDim = function (...args) {
  var xDim, yDim;

  if (args.length === 2) {
    xDim = args[0];
    yDim = args[1];
  } else if (args.length === 1) {
    xDim = args[0][0];
    yDim = args[0][1];
  } else {
    throw new Error("GPlot.setDim(): signature not supported");
  }

  if (xDim > 0 && yDim > 0) {
    // Make sure that the new outer dimensions are positive
    var xOuterDim = xDim + this.mar[1] + this.mar[3];
    var yOuterDim = yDim + this.mar[0] + this.mar[2];

    if (xOuterDim > 0 && yOuterDim > 0) {
      this.outerDim[0] = xOuterDim;
      this.outerDim[1] = yOuterDim;
      this.dim[0] = xDim;
      this.dim[1] = yDim;
      this.xAxis.setDim(this.dim);
      this.topAxis.setDim(this.dim);
      this.yAxis.setDim(this.dim);
      this.rightAxis.setDim(this.dim);
      this.title.setDim(this.dim);

      // Update the layers
      this.mainLayer.setDim(this.dim);

      for (var i = 0; i < this.layerList.length; i++) {
        this.layerList[i].setDim(this.dim);
      }
    }
  }
};

GPlot.prototype.setXLim = function (...args) {
  var lowerLim, upperLim;

  if (args.length === 2) {
    lowerLim = args[0];
    upperLim = args[1];
  } else if (args.length === 1) {
    lowerLim = args[0][0];
    upperLim = args[0][1];
  } else {
    throw new Error("GPlot.setXLim(): signature not supported");
  }

  if (lowerLim !== upperLim) {
    // Make sure the new limits makes sense
    if (this.xLog && (lowerLim <= 0 || upperLim <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
    } else {
      this.xLim[0] = lowerLim;
      this.xLim[1] = upperLim;
      this.invertedXScale = this.xLim[0] > this.xLim[1];

      // Fix the limits
      this.fixedXLim = true;

      // Update the axes
      this.xAxis.setLim(this.xLim);
      this.topAxis.setLim(this.xLim);

      // Update the plot limits
      this.updateLimits();
    }
  }
};

GPlot.prototype.setYLim = function (...args) {
  var lowerLim, upperLim;

  if (args.length === 2) {
    lowerLim = args[0];
    upperLim = args[1];
  } else if (args.length === 1) {
    lowerLim = args[0][0];
    upperLim = args[0][1];
  } else {
    throw new Error("GPlot.setYLim(): signature not supported");
  }

  if (lowerLim !== upperLim) {
    // Make sure the new limits makes sense
    if (this.yLog && (lowerLim <= 0 || upperLim <= 0)) {
      console.log("One of the limits is negative. This is not allowed in logarithmic scale.");
    } else {
      this.yLim[0] = lowerLim;
      this.yLim[1] = upperLim;
      this.invertedYScale = this.yLim[0] > this.yLim[1];

      // Fix the limits
      this.fixedYLim = true;

      // Update the axes
      this.yAxis.setLim(this.yLim);
      this.rightAxis.setLim(this.yLim);

      // Update the plot limits
      this.updateLimits();
    }
  }
};

GPlot.prototype.setFixedXLim = function (fixedXLim) {
  this.fixedXLim = fixedXLim;

  // Update the plot limits
  this.updateLimits();
};

GPlot.prototype.setFixedYLim = function (fixedYLim) {
  this.fixedYLim = fixedYLim;

  // Update the plot limits
  this.updateLimits();
};

GPlot.prototype.setLogScale = function (logType) {
  var newXLog = this.xLog;
  var newYLog = this.yLog;

  if (logType === "xy" || logType === "yx") {
    newXLog = true;
    newYLog = true;
  } else if (logType === "x") {
    newXLog = true;
    newYLog = false;
  } else if (logType === "y") {
    newXLog = false;
    newYLog = true;
  } else if (logType === "") {
    newXLog = false;
    newYLog = false;
  }

  // Do something only if the scale changed
  if (newXLog !== this.xLog || newYLog !== this.yLog) {
    // Set the new log scales
    this.xLog = newXLog;
    this.yLog = newYLog;

    // Unfix the limits if the old ones don't make sense
    if (this.xLog && this.fixedXLim && (this.xLim[0] <= 0 || this.xLim[1] <= 0)) {
      this.fixedXLim = false;
    }

    if (this.yLog && this.fixedYLim && (this.yLim[0] <= 0 || this.yLim[1] <= 0)) {
      this.fixedYLim = false;
    }

    // Calculate the new limits if needed
    if (!this.fixedXLim) {
      this.xLim = this.calculatePlotXLim();
    }

    if (!this.fixedYLim) {
      this.yLim = this.calculatePlotYLim();
    }

    // Update the axes
    this.xAxis.setLimAndLog(this.xLim, this.xLog);
    this.topAxis.setLimAndLog(this.xLim, this.xLog);
    this.yAxis.setLimAndLog(this.yLim, this.yLog);
    this.rightAxis.setLimAndLog(this.yLim, this.yLog);

    // Update the layers
    this.mainLayer.setLimAndLog(this.xLim, this.yLim, this.xLog, this.yLog);

    for (var i = 0; i < this.layerList.length; i++) {
      this.layerList[i].setLimAndLog(this.xLim, this.yLim, this.xLog, this.yLog);
    }
  }
};

GPlot.prototype.setInvertedXScale = function (invertedXScale) {
  if (invertedXScale !== this.invertedXScale) {
    this.invertedXScale = invertedXScale;
    var temp = this.xLim[0];
    this.xLim[0] = this.xLim[1];
    this.xLim[1] = temp;

    // Update the axes
    this.xAxis.setLim(this.xLim);
    this.topAxis.setLim(this.xLim);

    // Update the layers
    this.mainLayer.setXLim(this.xLim);

    for (var i = 0; i < this.layerList.length; i++) {
      this.layerList[i].setXLim(this.xLim);
    }
  }
};

GPlot.prototype.invertXScale = function () {
  this.setInvertedXScale(!this.invertedXScale);
};

GPlot.prototype.setInvertedYScale = function (invertedYScale) {
  if (invertedYScale !== this.invertedYScale) {
    this.invertedYScale = invertedYScale;
    var temp = this.yLim[0];
    this.yLim[0] = this.yLim[1];
    this.yLim[1] = temp;

    // Update the axes
    this.yAxis.setLim(this.yLim);
    this.rightAxis.setLim(this.yLim);

    // Update the layers
    this.mainLayer.setYLim(this.yLim);

    for (var i = 0; i < this.layerList.length; i++) {
      this.layerList[i].setYLim(this.yLim);
    }
  }
};

GPlot.prototype.invertYScale = function () {
  this.setInvertedYScale(!this.invertedYScale);
};

GPlot.prototype.setIncludeAllLayersInLim = function (includeAllLayers) {
  if (includeAllLayers !== this.includeAllLayersInLim) {
    this.includeAllLayersInLim = includeAllLayers;

    // Update the plot limits
    this.updateLimits();
  }
};

GPlot.prototype.setExpandLimFactor = function (expandFactor) {
  if (expandFactor >= 0 && expandFactor !== this.expandLimFactor) {
    this.expandLimFactor = expandFactor;

    // Update the plot limits
    this.updateLimits();
  }
};

GPlot.prototype.setBgColor = function (bgColor) {
  this.bgColor = bgColor;
};

GPlot.prototype.setBoxBgColor = function (boxBgColor) {
  this.boxBgColor = boxBgColor;
};

GPlot.prototype.setBoxLineColor = function (boxLineColor) {
  this.boxLineColor = boxLineColor;
};

GPlot.prototype.setBoxLineWidth = function (boxLineWidth) {
  if (boxLineWidth > 0) {
    this.boxLineWidth = boxLineWidth;
  }
};

GPlot.prototype.setGridLineColor = function (gridLineColor) {
  this.gridLineColor = gridLineColor;
};

GPlot.prototype.setGridLineWidth = function (gridLineWidth) {
  if (gridLineWidth > 0) {
    this.gridLineWidth = gridLineWidth;
  }
};

GPlot.prototype.setPoints = function (...args) {
  if (args.length === 2) {
    this.getLayer(args[1]).setPoints(args[0]);
  } else if (args.length === 1) {
    this.mainLayer.setPoints(args[0]);
  } else {
    throw new Error("GPlot.setPoints(): signature not supported");
  }

  this.updateLimits();
};

GPlot.prototype.setPoint = function (...args) {
  if (args.length === 5) {
    this.getLayer(args[4]).setPoint(args[0], args[1], args[2], args[3]);
  } else if (args.length === 4) {
    this.mainLayer.setPoint(args[0], args[1], args[2], args[3]);
  } else if (args.length === 3 && args[1] instanceof GPoint) {
    this.getLayer(args[2]).setPoint(args[0], args[1]);
  } else if (args.length === 3) {
    this.mainLayer.setPoint(args[0], args[1], args[2]);
  } else if (args.length === 2) {
    this.mainLayer.setPoint(args[0], args[1]);
  } else {
    throw new Error("GPlot.setPoint(): signature not supported");
  }

  this.updateLimits();
};

GPlot.prototype.addPoint = function (...args) {
  if (args.length === 4) {
    this.getLayer(args[3]).addPoint(args[0], args[1], args[2]);
  } else if (args.length === 3) {
    this.mainLayer.addPoint(args[0], args[1], args[2]);
  } else if (args.length === 2 && args[0] instanceof GPoint) {
    this.getLayer(args[1]).addPoint(args[0]);
  } else if (args.length === 2) {
    this.mainLayer.addPoint(args[0], args[1]);
  } else if (args.length === 1) {
    this.mainLayer.addPoint(args[0]);
  } else {
    throw new Error("GPlot.addPoint(): signature not supported");
  }

  this.updateLimits();
};

GPlot.prototype.addPoints = function (...args) {
  if (args.length === 2) {
    this.getLayer(args[1]).addPoints(args[0]);
  } else if (args.length === 1) {
    this.mainLayer.addPoints(args[0]);
  } else {
    throw new Error("GPlot.addPoints(): signature not supported");
  }

  this.updateLimits();
};

GPlot.prototype.removePoint = function (...args) {
  if (args.length === 2) {
    this.getLayer(args[1]).removePoint(args[0]);
  } else if (args.length === 1) {
    this.mainLayer.removePoint(args[0]);
  } else {
    throw new Error("GPlot.removePoint(): signature not supported");
  }

  this.updateLimits();
};

GPlot.prototype.addPointAtIndexPos = function (...args) {
  if (args.length === 5) {
    this.getLayer(args[4]).addPointAtIndexPos(args[0], args[1], args[2], args[3]);
  } else if (args.length === 4) {
    this.mainLayer.addPointAtIndexPos(args[0], args[1], args[2], args[3]);
  } else if (args.length === 3 && args[1] instanceof GPoint) {
    this.getLayer(args[2]).addPointAtIndexPos(args[0], args[1]);
  } else if (args.length === 3) {
    this.mainLayer.addPointAtIndexPos(args[0], args[1], args[2]);
  } else if (args.length === 2) {
    this.mainLayer.addPointAtIndexPos(args[0], args[1]);
  } else {
    throw new Error("GPlot.addPointAtIndexPos(): signature not supported");
  }

  this.updateLimits();
};

GPlot.prototype.setPointColors = function (pointColors) {
  this.mainLayer.setPointColors(pointColors);
};

GPlot.prototype.setPointColor = function (pointColor) {
  this.mainLayer.setPointColor(pointColor);
};

GPlot.prototype.setPointSizes = function (pointSizes) {
  this.mainLayer.setPointSizes(pointSizes);
};

GPlot.prototype.setPointSize = function (pointSize) {
  this.mainLayer.setPointSize(pointSize);
};

GPlot.prototype.setLineColor = function (lineColor) {
  this.mainLayer.setLineColor(lineColor);
};

GPlot.prototype.setLineWidth = function (lineWidth) {
  this.mainLayer.setLineWidth(lineWidth);
};

GPlot.prototype.setHistBasePoint = function (basePoint) {
  this.mainLayer.setHistBasePoint(basePoint);
};

GPlot.prototype.setHistType = function (histType) {
  this.mainLayer.setHistType(histType);
};

GPlot.prototype.setHistVisible = function (histVisible) {
  this.mainLayer.setHistVisible(histVisible);
};

GPlot.prototype.setDrawHistLabels = function (drawHistLabels) {
  this.mainLayer.setDrawHistLabels(drawHistLabels);
};

GPlot.prototype.setLabelBgColor = function (labelBgColor) {
  this.mainLayer.setLabelBgColor(labelBgColor);
};

GPlot.prototype.setLabelSeparation = function (labelSeparation) {
  this.mainLayer.setLabelSeparation(labelSeparation);
};

GPlot.prototype.setTitleText = function (text) {
  this.title.setText(text);
};

GPlot.prototype.setAxesOffset = function (offset) {
  this.xAxis.setOffset(offset);
  this.topAxis.setOffset(offset);
  this.yAxis.setOffset(offset);
  this.rightAxis.setOffset(offset);
};

GPlot.prototype.setTicksLength = function (tickLength) {
  this.xAxis.setTickLength(tickLength);
  this.topAxis.setTickLength(tickLength);
  this.yAxis.setTickLength(tickLength);
  this.rightAxis.setTickLength(tickLength);
};

GPlot.prototype.setHorizontalAxesNTicks = function (nTicks) {
  this.xAxis.setNTicks(nTicks);
  this.topAxis.setNTicks(nTicks);
};

GPlot.prototype.setHorizontalAxesTicksSeparation = function (ticksSeparation) {
  this.xAxis.setTicksSeparation(ticksSeparation);
  this.topAxis.setTicksSeparation(ticksSeparation);
};

GPlot.prototype.setHorizontalAxesTicks = function (ticks) {
  this.xAxis.setTicks(ticks);
  this.topAxis.setTicks(ticks);
};

GPlot.prototype.setVerticalAxesNTicks = function (nTicks) {
  this.yAxis.setNTicks(nTicks);
  this.rightAxis.setNTicks(nTicks);
};

GPlot.prototype.setVerticalAxesTicksSeparation = function (ticksSeparation) {
  this.yAxis.setTicksSeparation(ticksSeparation);
  this.rightAxis.setTicksSeparation(ticksSeparation);
};

GPlot.prototype.setVerticalAxesTicks = function (ticks) {
  this.yAxis.setTicks(ticks);
  this.rightAxis.setTicks(ticks);
};

GPlot.prototype.setFontName = function (fontName) {
  this.mainLayer.setFontName(fontName);
};

GPlot.prototype.setFontColor = function (fontColor) {
  this.mainLayer.setFontColor(fontColor);
};

GPlot.prototype.setFontSize = function (fontSize) {
  this.mainLayer.setFontSize(fontSize);
};

GPlot.prototype.setFontProperties = function (fontName, fontColor, fontSize) {
  this.mainLayer.setFontProperties(fontName, fontColor, fontSize);
};

GPlot.prototype.setAllFontProperties = function (fontName, fontColor, fontSize) {
  this.xAxis.setAllFontProperties(fontName, fontColor, fontSize);
  this.topAxis.setAllFontProperties(fontName, fontColor, fontSize);
  this.yAxis.setAllFontProperties(fontName, fontColor, fontSize);
  this.rightAxis.setAllFontProperties(fontName, fontColor, fontSize);
  this.title.setFontProperties(fontName, fontColor, fontSize);

  this.mainLayer.setAllFontProperties(fontName, fontColor, fontSize);

  for (var i = 0; i < this.layerList.length; i++) {
    this.layerList[i].setAllFontProperties(fontName, fontColor, fontSize);
  }
};

GPlot.prototype.getPos = function () {
  return this.pos.slice();
};

GPlot.prototype.getOuterDim = function () {
  return this.outerDim.slice();
};

GPlot.prototype.getMar = function () {
  return this.mar.slice();
};

GPlot.prototype.getDim = function () {
  return this.dim.slice();
};

GPlot.prototype.getXLim = function () {
  return this.xLim.slice();
};

GPlot.prototype.getYLim = function () {
  return this.yLim.slice();
};

GPlot.prototype.getFixedXLim = function () {
  return this.fixedXLim;
};

GPlot.prototype.getFixedYLim = function () {
  return this.fixedYLim;
};

GPlot.prototype.getXLog = function () {
  return this.xLog;
};

GPlot.prototype.getYLog = function () {
  return this.yLog;
};

GPlot.prototype.getInvertedXScale = function () {
  return this.invertedXScale;
};

GPlot.prototype.getInvertedYScale = function () {
  return this.invertedYScale;
};

GPlot.prototype.getMainLayer = function () {
  return this.mainLayer;
};

GPlot.prototype.getLayer = function (id) {
  var layer;

  if (this.mainLayer.isId(id)) {
    layer = this.mainLayer;
  } else {
    for (var i = 0; i < this.layerList.length; i++) {
      if (this.layerList[i].isId(id)) {
        layer = this.layerList[i];
        break;
      }
    }
  }

  if (typeof layer === "undefined") {
    console.log("Couldn't find a layer in the plot with id = " + id);
  }

  return layer;
};

GPlot.prototype.getXAxis = function () {
  return this.xAxis;
};

GPlot.prototype.getYAxis = function () {
  return this.yAxis;
};

GPlot.prototype.getTopAxis = function () {
  return this.topAxis;
};

GPlot.prototype.getRightAxis = function () {
  return this.rightAxis;
};

GPlot.prototype.getTitle = function () {
  return this.title;
};

GPlot.prototype.getPoints = function (...args) {
  if (args.length === 1) {
    return this.getLayer(args[0]).getPoints();
  } else if (args.length === 0) {
    return this.mainLayer.getPoints();
  } else {
    throw new Error("GPlot.getPoints(): signature not supported");
  }
};

GPlot.prototype.getPointsRef = function (...args) {
  if (args.length === 1) {
    return this.getLayer(args[0]).getPointsRef();
  } else if (args.length === 0) {
    return this.mainLayer.getPointsRef();
  } else {
    throw new Error("GPlot.getPointsRef(): signature not supported");
  }
};

GPlot.prototype.getHistogram = function (...args) {
  if (args.length === 1) {
    return this.getLayer(args[0]).getHistogram();
  } else if (args.length === 0) {
    return this.mainLayer.getHistogram();
  } else {
    throw new Error("GPlot.getHistogram(): signature not supported");
  }
};

GPlot.prototype.activateZooming = function (...args) {
  var zoomFactor, increaseButton, decreaseButton, increaseKeyModifier, decreaseKeyModifier;

  if (args.length === 5) {
    zoomFactor = args[0];
    increaseButton = args[1];
    decreaseButton = args[2];
    increaseKeyModifier = args[3];
    decreaseKeyModifier = args[4];
  } else if (args.length === 3) {
    zoomFactor = args[0];
    increaseButton = args[1];
    decreaseButton = args[2];
    increaseKeyModifier = GPlot.NONE;
    decreaseKeyModifier = GPlot.NONE;
  } else if (args.length === 1) {
    zoomFactor = args[0];
    increaseButton = this.parent.LEFT;
    decreaseButton = this.parent.RIGHT;
    increaseKeyModifier = GPlot.NONE;
    decreaseKeyModifier = GPlot.NONE;
  } else if (args.length === 0) {
    zoomFactor = 1.3;
    increaseButton = this.parent.LEFT;
    decreaseButton = this.parent.RIGHT;
    increaseKeyModifier = GPlot.NONE;
    decreaseKeyModifier = GPlot.NONE;
  } else {
    throw new Error("GPlot.activateZooming(): signature not supported");
  }

  this.zoomingIsActive = true;

  if (zoomFactor > 0) {
    this.zoomFactor = zoomFactor;
  }

  if (increaseButton === this.parent.LEFT || increaseButton === this.parent.RIGHT || increaseButton === this.parent.CENTER) {
    this.increaseZoomButton = increaseButton;
  }

  if (decreaseButton === this.parent.LEFT || decreaseButton === this.parent.RIGHT || decreaseButton === this.parent.CENTER) {
    this.decreaseZoomButton = decreaseButton;
  }

  if (increaseKeyModifier === this.parent.SHIFT || increaseKeyModifier === this.parent.CONTROL || increaseKeyModifier === this.parent.ALT || increaseKeyModifier === GPlot.NONE) {
    this.increaseZoomKeyModifier = increaseKeyModifier;
  }

  if (decreaseKeyModifier === this.parent.SHIFT || decreaseKeyModifier === this.parent.CONTROL || decreaseKeyModifier === this.parent.ALT || decreaseKeyModifier === GPlot.NONE) {
    this.decreaseZoomKeyModifier = decreaseKeyModifier;
  }
};

GPlot.prototype.deactivateZooming = function () {
  this.zoomingIsActive = false;
};

GPlot.prototype.activateCentering = function (...args) {
  var button, keyModifier;

  if (args.length === 2) {
    button = args[0];
    keyModifier = args[1];
  } else if (args.length === 1) {
    button = args[0];
    keyModifier = GPlot.NONE;
  } else if (args.length === 0) {
    button = this.parent.LEFT;
    keyModifier = GPlot.NONE;
  } else {
    throw new Error("GPlot.activateCentering(): signature not supported");
  }

  this.centeringIsActive = true;

  if (button === this.parent.LEFT || button === this.parent.RIGHT || button === this.parent.CENTER) {
    this.centeringButton = button;
  }

  if (keyModifier === this.parent.SHIFT || keyModifier === this.parent.CONTROL || keyModifier === this.parent.ALT || keyModifier === GPlot.NONE) {
    this.centeringKeyModifier = keyModifier;
  }
};

GPlot.prototype.deactivateCentering = function () {
  this.centeringIsActive = false;
};

GPlot.prototype.activatePanning = function (...args) {
  var button, keyModifier;

  if (args.length === 2) {
    button = args[0];
    keyModifier = args[1];
  } else if (args.length === 1) {
    button = args[0];
    keyModifier = GPlot.NONE;
  } else if (args.length === 0) {
    button = this.parent.LEFT;
    keyModifier = GPlot.NONE;
  } else {
    throw new Error("GPlot.activatePanning(): signature not supported");
  }

  this.panningIsActive = true;

  if (button === this.parent.LEFT || button === this.parent.RIGHT || button === this.parent.CENTER) {
    this.panningButton = button;
  }

  if (keyModifier === this.parent.SHIFT || keyModifier === this.parent.CONTROL || keyModifier === this.parent.ALT || keyModifier === GPlot.NONE) {
    this.panningKeyModifier = keyModifier;
  }
};

GPlot.prototype.deactivatePanning = function () {
  this.panningIsActive = false;
  this.panningReferencePoint = undefined;
};

GPlot.prototype.activatePointLabels = function (...args) {
  var button, keyModifier;

  if (args.length === 2) {
    button = args[0];
    keyModifier = args[1];
  } else if (args.length === 1) {
    button = args[0];
    keyModifier = GPlot.NONE;
  } else if (args.length === 0) {
    button = this.parent.LEFT;
    keyModifier = GPlot.NONE;
  } else {
    throw new Error("GPlot.activatePointLabels(): signature not supported");
  }

  this.labelingIsActive = true;

  if (button === this.parent.LEFT || button === this.parent.RIGHT || button === this.parent.CENTER) {
    this.labelingButton = button;
  }

  if (keyModifier === this.parent.SHIFT || keyModifier === this.parent.CONTROL || keyModifier === this.parent.ALT || keyModifier === GPlot.NONE) {
    this.labelingKeyModifier = keyModifier;
  }
};

GPlot.prototype.deactivatePointLabels = function () {
  this.labelingIsActive = false;
  this.mousePos = undefined;
};

GPlot.prototype.activateReset = function (...args) {
  var button, keyModifier;

  if (args.length === 2) {
    button = args[0];
    keyModifier = args[1];
  } else if (args.length === 1) {
    button = args[0];
    keyModifier = GPlot.NONE;
  } else if (args.length === 0) {
    button = this.parent.RIGHT;
    keyModifier = GPlot.NONE;
  } else {
    throw new Error("GPlot.activateReset(): signature not supported");
  }

  this.resetIsActive = true;
  this.xLimReset = undefined;
  this.yLimReset = undefined;

  if (button === this.parent.LEFT || button === this.parent.RIGHT || button === this.parent.CENTER) {
    this.resetButton = button;
  }

  if (keyModifier === this.parent.SHIFT || keyModifier === this.parent.CONTROL || keyModifier === this.parent.ALT || keyModifier === GPlot.NONE) {
    this.resetKeyModifier = keyModifier;
  }
};

GPlot.prototype.deactivateReset = function () {
  this.resetIsActive = false;
  this.xLimReset = undefined;
  this.yLimReset = undefined;
};

GPlot.prototype.getButton = function (event) {
  var button;

  if (event.button === 0) {
    button = this.parent.LEFT;
  } else if (event.button === 1) {
    button = this.parent.CENTER;
  } else if (event.button === 2) {
    button = this.parent.RIGHT;
  } else if (typeof event.button === "undefined") {
    button = this.parent.LEFT;
  }

  return button;
};

GPlot.prototype.getModifier = function (event) {
  var modifier;

  if (event.altKey) {
    modifier = this.parent.ALT;
  } else if (event.ctrlKey) {
    modifier = this.parent.CONTROL;
  } else if (event.shiftKey) {
    modifier = this.parent.SHIFT;
  } else {
    modifier = GPlot.NONE;
  }

  return modifier;
};

GPlot.prototype.saveResetLimits = function () {
  if (typeof this.xLimReset === "undefined" || typeof this.yLimReset === "undefined") {
    this.xLimReset = this.xLim.slice();
    this.yLimReset = this.yLim.slice();
  }
};

GPlot.prototype.clickEvent = function (event) {
  var e = event || window.event;

  if (this.isOverBox()) {
    var button = this.getButton(e);
    var modifier = this.getModifier(e);

    if (this.zoomingIsActive) {
      if (button === this.increaseZoomButton && modifier === this.increaseZoomKeyModifier) {
        // Save the axes limits
        if (this.resetIsActive) {
          this.saveResetLimits();
        }

        this.zoom(this.zoomFactor, this.parent.mouseX, this.parent.mouseY);
      } else if (button === this.decreaseZoomButton && modifier === this.decreaseZoomKeyModifier) {
        // Save the axes limits
        if (this.resetIsActive) {
          this.saveResetLimits();
        }

        this.zoom(1 / this.zoomFactor, this.parent.mouseX, this.parent.mouseY);
      }
    }

    if (this.centeringIsActive && button === this.centeringButton && modifier === this.centeringKeyModifier) {
      // Save the axes limits
      if (this.resetIsActive) {
        this.saveResetLimits();
      }

      this.center(this.parent.mouseX, this.parent.mouseY);
    }

    if (this.resetIsActive && button === this.resetButton && modifier === this.resetKeyModifier) {
      if (typeof this.xLimReset !== "undefined" && typeof this.yLimReset !== "undefined") {
        this.setXLim(this.xLimReset);
        this.setYLim(this.yLimReset);
        this.xLimReset = undefined;
        this.yLimReset = undefined;
      }
    }
  }
};

GPlot.prototype.wheelEvent = function (event) {
  var e = event || window.event;

  if (this.isOverBox()) {
    var deltaY = e.deltaY;
    var button = this.parent.CENTER;
    var modifier = this.getModifier(e);

    if (this.zoomingIsActive) {
      if (button === this.increaseZoomButton && modifier === this.increaseZoomKeyModifier && deltaY > 0) {
        e.preventDefault();

        // Save the axes limits
        if (this.resetIsActive) {
          this.saveResetLimits();
        }

        this.zoom(this.zoomFactor, this.parent.mouseX, this.parent.mouseY);
      } else if (button === this.decreaseZoomButton && modifier === this.decreaseZoomKeyModifier && deltaY < 0) {
        e.preventDefault();

        // Save the axes limits
        if (this.resetIsActive) {
          this.saveResetLimits();
        }

        this.zoom(1 / this.zoomFactor, this.parent.mouseX, this.parent.mouseY);
      }
    }
  }
};

GPlot.prototype.mouseDownEvent = function (event) {
  var e = event || window.event;

  if (this.isOverBox()) {
    var addListeners = false;
    var button = this.getButton(e);
    var modifier = this.getModifier(e);

    if (this.panningIsActive && button === this.panningButton && modifier === this.panningKeyModifier) {
      addListeners = true;

      // Save the axes limits
      if (this.resetIsActive) {
        this.saveResetLimits();
      }

      // Calculate the panning reference point
      this.panningReferencePoint = this.getValueAt(this.parent.mouseX, this.parent.mouseY);
    }

    if (this.labelingIsActive && button === this.labelingButton && modifier === this.labelingKeyModifier) {
      addListeners = true;
      this.mousePos = [this.parent.mouseX, this.parent.mouseY];
    }

    if (addListeners) {
      // Add the mousemove and mouseup event listeners
      document.addEventListener('mousemove', this.mouseMoveListener, false);
      document.addEventListener('mouseup', this.mouseUpListener, false);
    }
  }
};

GPlot.prototype.mouseMoveEvent = function (event) {
  var e = event || window.event;
  var button = this.getButton(e);
  var modifier = this.getModifier(e);
  event.preventDefault();

  if (this.panningIsActive && button === this.panningButton && modifier === this.panningKeyModifier) {
    this.align(this.panningReferencePoint, this.parent.mouseX, this.parent.mouseY);
  }

  if (this.labelingIsActive && button === this.labelingButton && modifier === this.labelingKeyModifier) {
    this.mousePos = [this.parent.mouseX, this.parent.mouseY];
  }
};

GPlot.prototype.mouseUpEvent = function (event) {
  var e = event || window.event;
  var button = this.getButton(e);

  // Remove the mousemove and mouseup event listeners
  document.removeEventListener('mousemove', this.mouseMoveListener, false);
  document.removeEventListener('mouseup', this.mouseUpListener, false);

  if (this.panningIsActive && button === this.panningButton) {
    // Reset the panning variables
    this.panningReferencePoint = undefined;
  }

  if (this.labelingIsActive && button === this.labelingButton) {
    this.mousePos = undefined;
  }
};

GPlot.prototype.touchStartEvent = function (event) {
  var e = event || window.event;
  this.parent._ontouchstart(e);

  if (this.isOverBox()) {
    var addListeners = false;

    if (this.panningIsActive) {
      addListeners = true;
      this.panningReferencePoint = this.getValueAt(this.parent.mouseX, this.parent.mouseY);
    }

    if (this.labelingIsActive) {
      addListeners = true;
      this.mousePos = [this.parent.mouseX, this.parent.mouseY];
    }

    if (this.zoomingIsActive && typeof e.touches !== "undefined" && e.touches.length === 2) {
      addListeners = true;
      var dx = e.touches[0].pageX - e.touches[1].pageX;
      var dy = e.touches[0].pageY - e.touches[1].pageY;
      this.zoomStartDistance = Math.sqrt(dx * dx + dy * dy);
      this.zoomStartPosition = [this.parent.mouseX, this.parent.mouseY];
    }

    if (addListeners) {
      // Add the touchmove, touchend and touchcancel event listeners
      document.addEventListener('touchmove', this.touchMoveListener, { passive: false });
      document.addEventListener('touchend', this.touchEndListener, false);
      document.addEventListener('touchcancel', this.touchEndListener, false);
    }
  }
};

GPlot.prototype.touchMoveEvent = function (event) {
  var e = event || window.event;
  e.preventDefault();

  if (this.panningIsActive) {
    this.align(this.panningReferencePoint, this.parent.mouseX, this.parent.mouseY);
  }

  if (this.labelingIsActive) {
    this.mousePos = [this.parent.mouseX, this.parent.mouseY];
  }

  if (this.zoomingIsActive && typeof e.touches !== "undefined" && e.touches.length === 2) {
    var dx = e.touches[0].pageX - e.touches[1].pageX;
    var dy = e.touches[0].pageY - e.touches[1].pageY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    this.zoom(distance / this.zoomStartDistance, this.zoomStartPosition[0], this.zoomStartPosition[1]);
    this.zoomStartDistance = distance;
  }
};

GPlot.prototype.touchEndEvent = function (event) {
  // Remove the touchmove, touchend and touch cancel event listeners
  document.removeEventListener('touchmove', this.touchMoveListener, false);
  document.removeEventListener('touchend', this.touchEndListener, false);
  document.removeEventListener('touchcancel', this.touchEndListener, false);

  if (this.panningIsActive) {
    this.panningReferencePoint = undefined;
  }

  if (this.labelingIsActive) {
    this.mousePos = undefined;
  }

  if (this.zoomingIsActive) {
    this.zoomStartDistance = undefined;
    this.zoomStartPosition = undefined;
  }
};

GPlot.prototype.preventDefaultEvent = function (event) {
  var e = event || window.event;

  if (this.isOverBox()) {
    e.preventDefault();
  }
};

GPlot.prototype.contextMenuEvent = function (event) {
  var e = event || window.event;

  if (this.isOverBox()) {
    e.preventDefault();
    this.clickEvent(e);
  }
};

GPlot.prototype.preventWheelDefault = function () {
  this.parentElt.addEventListener("wheel", this.preventDefaultEvent.bind(this), false);
};

GPlot.prototype.preventRightClickDefault = function () {
  this.parentElt.addEventListener("contextmenu", this.contextMenuEvent.bind(this), false);
};

export { GPlot, GTitle, GAxis, GPoint, GAxisLabel, GHistogram, GLayer };