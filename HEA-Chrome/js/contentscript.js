function _main_ () {
    // ##########################################################################
    // ### Ben Alman's replaceText plugin
    // ### http://www.benalman.com/projects/jquery-replacetext-plugin/
    $.fn.replaceText = function( search, replace, text_only ) {
        return this.each(function(){
            var node = this.firstChild,
                val,
                new_val,
                remove = [];
            if ( node ) {
                do {
                    if ( node.nodeType === 3 ) {
                        val = node.nodeValue;
                        new_val = val.replace( search, replace );
                        if ( new_val !== val ) {
                            if ( !text_only && /</.test( new_val ) ) {
                                $(node).before( new_val );
                                remove.push( node );
                            } else {
                                node.nodeValue = new_val;
                            }
                        }
                    }
                } while ( node = node.nextSibling );
            }
            remove.length && $(remove).remove();
        });
    };

    // ### test the replaceText function
    //$("*").replaceText( /1755/g, "1755 [11755 <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]");

    _main_replacementRules(_main_unique(_main_makeArrays(_main_clearArray(_main_extractText()))));
    _main_centuryReplacement();
}

_main_();


// ##########################################################################
// #### Extract the text from body and place it into an array
function _main_extractText () {
    var bodyText = $('body').text();
    bodyText = bodyText.replace(/(\r\n|\n|\r)/gm," ");
    //console.log(bodyText);

    var bodyTextArray = [];
    bodyTextArray = $.each(bodyText.split(" ").slice(0,-1), function(index, item) { });
    // console.log(bodyTextArray);
    return bodyTextArray;
}


// ##########################################################################
// #### keep in array i, i+1, i-1 if i has one or more numbers
function _main_clearArray (bodyTextArray) {
    function cleanArray(arrayToBeCleaned) {
        // the function cleans the array of empty strings and strings containing only whitespace
        var firstCleanArray = new Array();
        var secondCleanArray = new Array();
        var thirdCleanArray = new Array();

        for (var i = 0; i < arrayToBeCleaned.length; i++) {
            if (/\b\d+s?\b/.test(arrayToBeCleaned[i]) && /\S/.test(arrayToBeCleaned[i]) && !/\d+]/.test(arrayToBeCleaned[i]) && !/p+\.\s\d+/.test(arrayToBeCleaned[i])) {
                firstCleanArray.push(arrayToBeCleaned[i-1]);
                firstCleanArray.push(arrayToBeCleaned[i]);
                firstCleanArray.push(arrayToBeCleaned[i+1]);
            }
        }

        for (var j = 0; j < firstCleanArray.length; j++) {
            if (firstCleanArray[j] !== firstCleanArray[j+1]
                && firstCleanArray[j] !== firstCleanArray[j+2]
                && /\S/.test(firstCleanArray[j])
                && !/\^/.test(firstCleanArray[j])
                && !/p+./.test(firstCleanArray[j-1])
                && !/p+./.test(firstCleanArray[j])
                && !/\d{1}\.\d{1}/.test(firstCleanArray[j])
                && !/(\d+-\d+-\d+-\d+)/.test(firstCleanArray[j])) {
                secondCleanArray.push(firstCleanArray[j]);
            }
        }

        for (var k = 0; k < secondCleanArray.length; k++) {
            if(/\b\d{1,5}s?\b/.test(secondCleanArray[k])
                || /(\bin\b)|(\bby\b)|(\bduring\b)|(\byear\b)|(\bc\.)|(\bca\.)|(\blate\b)|(\bjanuary\b)|(\bfebruary\b)|(\bmarch\b)|(\bapril\b)|(\bmay\b)|(\bjune\b)|(\bjuly\b)|(\baugust\b)|(\bseptember\b)|(\boctober\b)|(\bnovember\b)|(\bdecember\b)|(\blate\b)|(\bAD\b)|(\bB?CE?\b)/i.test(secondCleanArray[k])
                && !/(\bISBN\b)|(\bISSN\b)/.test(secondCleanArray[k])) {
                thirdCleanArray.push(secondCleanArray[k]);
            }
        }

        return thirdCleanArray;
    }

    var cleanedArray = cleanArray(bodyTextArray);
    console.log(cleanedArray)
    return cleanedArray;
}


// ##########################################################################
// #### make array of arrays to contain the detected numbers that are years
function _main_makeArrays (cleanedArray) {
    function makeArrays(arrayToBeChecked) {
        var arrayOfYears = {};

        arrayOfYears["FiveDigitsYearBC"] = [];
        arrayOfYears["FiveDigitsYearBCE"] = [];

        arrayOfYears["FourDigitsYear"] = [];
        arrayOfYears["FourDigitsYearAD"] = [];
        arrayOfYears["FourDigitsYearCE"] = [];
        arrayOfYears["FourDigitsAndS"] = [];
        arrayOfYears["FourDigitsDashFourDigits"] = [];
        arrayOfYears["FourDigitsDashOneTwoDigits"] = [];
        arrayOfYears["FourDigitsYearBC"] = [];
        arrayOfYears["FourDigitsYearBCE"] = [];
        arrayOfYears["FourDigitsAndSBC"] = [];
        arrayOfYears["FourDigitsAndSBCE"] = [];

        arrayOfYears["ThreeDigitsYearAD"] = [];
        arrayOfYears["ADThreeDigitsYear"] = [];
        arrayOfYears["ThreeDigitsYearCE"] = [];
        arrayOfYears["ThreeDigitsYear"] = [];
        arrayOfYears["ThreeDigitsAndS"] = [];
        arrayOfYears["ThreeDigitsDashThreeDigits"] = [];
        arrayOfYears["ThreeDigitsDashOneTwoDigits"] = [];
        arrayOfYears["ThreeDigitsYearBC"] = [];
        arrayOfYears["ThreeDigitsYearBCE"] = [];
        arrayOfYears["ThreeDigitsAndSBC"] = [];
        arrayOfYears["ThreeDigitsAndSBCE"] = [];
        arrayOfYears["ThreeDigitsDashThreeDigitsBC"] = [];
        arrayOfYears["ThreeDigitsDashThreeDigitsBCE"] = [];
        arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"] = [];
        arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"] = [];

        arrayOfYears["TwoDigitsYearAD"] = [];
        arrayOfYears["ADTwoDigitsYear"] = [];
        arrayOfYears["TwoDigitsYearCE"] = [];
        arrayOfYears["TwoDigitsDashOneTwoDigitsAD"] = [];
        arrayOfYears["TwoDigitsDashOneTwoDigitsCE"] = [];
        arrayOfYears["TwoDigitsYearBC"] = [];
        arrayOfYears["TwoDigitsYearBCE"] = [];
        arrayOfYears["TwoDigitsDashOneTwoDigitsBC"] = [];
        arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"] = [];

        arrayOfYears["OneDigitYearAD"] = [];
        arrayOfYears["ADOneDigitYear"] = [];
        arrayOfYears["OneDigitYearCE"] = [];
        arrayOfYears["OneDigitYearBC"] = [];
        arrayOfYears["OneDigitYearBCE"] = [];

        for (var i = 0; i < arrayToBeChecked.length; i++) {
            // #### 5 digits
            if (/\b\d{5}\b/.test(arrayToBeChecked[i])) {
                if (/\b\d{5}\b/.test(arrayToBeChecked[i]) && /BC/.test(arrayToBeChecked[i+1])) {
                    arrayOfYears["FiveDigitsYearBC"].push(parseInt(/\b\d{5}\b/.exec(arrayToBeChecked[i])[0]));
                }
                if (/\b\d{5}\b/.test(arrayToBeChecked[i]) && /BCE/.test(arrayToBeChecked[i+1])) {
                    arrayOfYears["FiveDigitsYearBCE"].push(parseInt(/\b\d{5}\b/.exec(arrayToBeChecked[i])[0]));
                }
            }

            // #### 4 digits
            if (/\b\d{4}s?\b/.test(arrayToBeChecked[i])) {
                // #### 4 digits AD/CE
                if (/\b\d{4}\b/.test(arrayToBeChecked[i]) && !/[a-zA-Z]/.test(arrayToBeChecked[i])
                    && !/BC/.test(arrayToBeChecked[i+1])
                    && !/AD/.test(arrayToBeChecked[i+1])
                    && !/-|–/.test(arrayToBeChecked[i])) {
                    if (parseInt(/\b\d{4}\b/.exec(arrayToBeChecked[i])[0]) <= 2200 && parseInt(/\b\d{4}\b/.exec(arrayToBeChecked[i])[0]) >= 1000) {
                        arrayOfYears["FourDigitsYear"].push(parseInt(/\b\d{4}\b/.exec(arrayToBeChecked[i])[0]));
                    }
                }

                if (/\b\d{4}\b/.test(arrayToBeChecked[i]) && /AD/.test(arrayToBeChecked[i+1])) {
                    arrayOfYears["FourDigitsYearAD"].push(parseInt(/\b\d{4}\b/.exec(arrayToBeChecked[i])[0]));
                }

                if (/\b\d{4}\b/.test(arrayToBeChecked[i]) && /CE/.test(arrayToBeChecked[i+1])) {
                    arrayOfYears["FourDigitsYearCE"].push(parseInt(/\b\d{4}\b/.exec(arrayToBeChecked[i])[0]));
                }

                if (/\b\d{4}s/.test(arrayToBeChecked[i]) && !/BCE?/.test(arrayToBeChecked[i+1])) {
                    var fourDigitsAndSValue = /\b\d{4}s/.exec(arrayToBeChecked[i]);
                    arrayOfYears["FourDigitsAndS"].push(parseInt(fourDigitsAndSValue[0].slice(0,4)));
                }

                if (/\b\d{4}(–|-)\d{4}\b/.test(arrayToBeChecked[i])) {
                    var dashFourDigitsArray = [];
                    var matchDashFourDigits = /\b(\d{4})(–|-)(\d{4})\b/.exec(arrayToBeChecked[i]);
                    dashFourDigitsArray[0] = parseInt(RegExp.$1);
                    dashFourDigitsArray[1] = parseInt(RegExp.$3);
                    arrayOfYears["FourDigitsDashFourDigits"].push(dashFourDigitsArray);
                }

                if (/\b\d{4}(-|–)\d{1,2}\b/.test(arrayToBeChecked[i])) {
                    var fourDashOneTwoDigitsArray = [];
                    var matchFourDashTwoDigits = /\b(\d{4})(–|-)(\d{1,2})\b/.exec(arrayToBeChecked[i]);
                    fourDashOneTwoDigitsArray[0] = parseInt(RegExp.$1);
                    fourDashOneTwoDigitsArray[1] = parseInt(RegExp.$3);
                    arrayOfYears["FourDigitsDashOneTwoDigits"].push(fourDashOneTwoDigitsArray);
                }


                // #### 4 digits BC/BCE
                if (/\b\d{4}s/.test(arrayToBeChecked[i]) && /BC/.test(arrayToBeChecked[i+1])) {
                    var fourDigitsAndSValueBC = /\b\d{4}s/.exec(arrayToBeChecked[i]);
                    arrayOfYears["FourDigitsAndSBC"].push(parseInt(fourDigitsAndSValueBC[0].slice(0,4)));
                }

                if (/\b\d{4}s/.test(arrayToBeChecked[i]) && /BCE/.test(arrayToBeChecked[i+1])) {
                    var fourDigitsAndSValueBCE = /\b\d{4}s/.exec(arrayToBeChecked[i]);
                    arrayOfYears["FourDigitsAndSBCE"].push(parseInt(fourDigitsAndSValueBCE[0].slice(0,4)));
                }

                if (/\b\d{4}\b/.test(arrayToBeChecked[i]) && /BC/.test(arrayToBeChecked[i+1])) {
                    arrayOfYears["FourDigitsYearBC"].push(parseInt(/\b\d{4}\b/.exec(arrayToBeChecked[i])[0]));
                }

                if (/\b\d{4}\b/.test(arrayToBeChecked[i]) && /BCE/.test(arrayToBeChecked[i+1])) {
                    arrayOfYears["FourDigitsYearBCE"].push(parseInt(/\b\d{4}\b/.exec(arrayToBeChecked[i])[0]));
                }
            }

            // #### 3 digits
            if (/\b\d{3}s?\b/.test(arrayToBeChecked[i])) {
                // #### 3 digits AD/CE
                if (/\b\d{3}\b(?!])(?!:)/.test(arrayToBeChecked[i])
                            && !/(–|-)/i.test(arrayToBeChecked[i])
                            && !/p+\.\s\d{3}/.test(arrayToBeChecked[i])
                            && !/p+\.\s/.test(arrayToBeChecked[i-1])
                            && /(in|by|during|year|ca\.|c\.|late|january|february|march|april|may|june|july|august|september|october|november|december)/i.test(arrayToBeChecked[i-1])
                            && !/AD/.test(arrayToBeChecked[i+1])
                            && !/BC/.test(arrayToBeChecked[i+1])) {
                    if (parseInt(/\b\d{3}\b/.exec(arrayToBeChecked[i])[0]) >= 100) {
                        arrayOfYears["ThreeDigitsYear"].push(parseInt(/\b\d{3}\b/.exec(arrayToBeChecked[i])[0]));
                    }
                }

                if (/\b\d{3}\b/.test(arrayToBeChecked[i]) && /AD/.test(arrayToBeChecked[i+1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["ThreeDigitsYearAD"].push(parseInt(/\b\d{3}\b/.exec(arrayToBeChecked[i])[0]));
                }

                if (/\b\d{3}\b/.test(arrayToBeChecked[i]) && /AD/.test(arrayToBeChecked[i-1])) {
                    arrayOfYears["ADThreeDigitsYear"].push(parseInt(/\b\d{3}\b/.exec(arrayToBeChecked[i])[0]));
                }

                if (/\b\d{3}\b/.test(arrayToBeChecked[i]) && /CE/.test(arrayToBeChecked[i+1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["ThreeDigitsYearCE"].push(parseInt(/\b\d{3}\b/.exec(arrayToBeChecked[i])[0]));
                }

                if (/\b\d{3}s/.test(arrayToBeChecked[i]) && !/BCE?/.test(arrayToBeChecked[i+1])) {
                    var threeDigitsAndSValue = /\b\d{3}s/.exec(arrayToBeChecked[i]);
                    arrayOfYears["ThreeDigitsAndS"].push(parseInt(threeDigitsAndSValue[0].slice(0,3)));
                }

                if (/\b\d{3}(–|-)\d{3}\b/.test(arrayToBeChecked[i])
                            && !/p+\.\s\d{3}/.test(arrayToBeChecked[i])
                            && !/p+\.\s/.test(arrayToBeChecked[i-1])) {
                    var dashThreeDigitsArray = [];
                    var matchDashThreeDigits = /\b(\d{3})(–|-)(\d{3})\b/.exec(arrayToBeChecked[i]);
                    dashThreeDigitsArray[0] = parseInt(RegExp.$1);
                    dashThreeDigitsArray[1] = parseInt(RegExp.$3);
                    arrayOfYears["ThreeDigitsDashThreeDigits"].push(dashThreeDigitsArray);
                }

                if (/\b\d{3}(–|-)\d{1,2}\b/.test(arrayToBeChecked[i])
                            && !/p+\.\s\d{1,2}/.test(arrayToBeChecked[i])
                            && !/p+\.\s/.test(arrayToBeChecked[i-1])) {
                    var threeDashOneTwoDigitsArray = [];
                    var matchThreeDashTwoDigits = /\b(\d{3})(–|-)(\d{1,2})\b/.exec(arrayToBeChecked[i]);
                    threeDashOneTwoDigitsArray[0] = parseInt(RegExp.$1);
                    threeDashOneTwoDigitsArray[1] = parseInt(RegExp.$3);
                    arrayOfYears["ThreeDigitsDashOneTwoDigits"].push(threeDashOneTwoDigitsArray);
                }


                // #### 3 digits BC/BCE
                if (/\b\d{3}\b/.test(arrayToBeChecked[i]) && /BC/.test(arrayToBeChecked[i+1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["ThreeDigitsYearBC"].push(parseInt(/\b\d{3}\b/.exec(arrayToBeChecked[i])[0]));
                }

                if (/\b\d{3}\b/.test(arrayToBeChecked[i]) && /BCE/.test(arrayToBeChecked[i+1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["ThreeDigitsYearBCE"].push(parseInt(/\b\d{3}\b/.exec(arrayToBeChecked[i])[0]));
                }

                if (/\b\d{3}s/.test(arrayToBeChecked[i]) && /BC/.test(arrayToBeChecked[i+1])) {
                    var threeDigitsAndSBCValue = /\b\d{3}s/.exec(arrayToBeChecked[i]);
                    arrayOfYears["ThreeDigitsAndSBC"].push(parseInt(threeDigitsAndSBCValue[0].slice(0,3)));
                }

                if (/\b\d{3}s/.test(arrayToBeChecked[i]) && /BCE/.test(arrayToBeChecked[i+1])) {
                    var threeDigitsAndSBCEValue = /\b\d{3}s/.exec(arrayToBeChecked[i]);
                    arrayOfYears["ThreeDigitsAndSBCE"].push(parseInt(threeDigitsAndSBCEValue[0].slice(0,3)));
                }

                if (/\b\d{3}(–|-)\d{3}\b/.test(arrayToBeChecked[i]) && /BC\b/.test(arrayToBeChecked[i+1])) {
                    var dashThreeDigitsArrayBC = [];
                    var matchDashThreeDigitsBC = /\b(\d{3})(–|-)(\d{3})\b/.exec(arrayToBeChecked[i]);
                    dashThreeDigitsArrayBC[0] = parseInt(RegExp.$1);
                    dashThreeDigitsArrayBC[1] = parseInt(RegExp.$3);
                    arrayOfYears["ThreeDigitsDashThreeDigitsBC"].push(dashThreeDigitsArrayBC);
                }

                if (/\b\d{3}(–|-)\d{3}\b/.test(arrayToBeChecked[i]) && /BCE\b/.test(arrayToBeChecked[i+1])) {
                    var dashThreeDigitsArrayBCE = [];
                    var matchDashThreeDigitsBCE = /\b(\d{3})(–|-)(\d{3})\b/.exec(arrayToBeChecked[i]);
                    dashThreeDigitsArrayBCE[0] = parseInt(RegExp.$1);
                    dashThreeDigitsArrayBCE[1] = parseInt(RegExp.$3);
                    arrayOfYears["ThreeDigitsDashThreeDigitsBCE"].push(dashThreeDigitsArrayBCE);
                }

                if (/\b\d{3}(–|-)\d{1,2}\b/.test(arrayToBeChecked[i]) && /BC\b/.test(arrayToBeChecked[i+1])) {
                    var dashThreeDigitsOneTwoArrayBC = [];
                    var matchDashThreeDigitsOneTwoBC = /\b(\d{3})(–|-)(\d{1,2})\b/.exec(arrayToBeChecked[i]);
                    dashThreeDigitsOneTwoArrayBC[0] = parseInt(RegExp.$1);
                    dashThreeDigitsOneTwoArrayBC[1] = parseInt(RegExp.$3);
                    arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"].push(dashThreeDigitsOneTwoArrayBC);
                }

                if (/\b\d{3}(–|-)\d{1,2}\b/.test(arrayToBeChecked[i]) && /BCE\b/.test(arrayToBeChecked[i+1])) {
                    var dashThreeDigitsOneTwoArrayBCE = [];
                    var matchDashThreeDigitsOneTwoBCE = /\b(\d{3})(–|-)(\d{1,2})\b/.exec(arrayToBeChecked[i]);
                    dashThreeDigitsOneTwoArrayBCE[0] = parseInt(RegExp.$1);
                    dashThreeDigitsOneTwoArrayBCE[1] = parseInt(RegExp.$3);
                    arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"].push(dashThreeDigitsOneTwoArrayBCE);
                }
            }

            // #### 2 digits
            if (/\b\d{2}\b/.test(arrayToBeChecked[i])) {
                // #### 2 digits AD/CE
                if (/\b\d{2}\b/.test(arrayToBeChecked[i]) && /AD/.test(arrayToBeChecked[i+1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["TwoDigitsYearAD"].push(parseInt(/\b\d{2}\b/.exec(arrayToBeChecked[i])[0]));
                }
                if (/\b\d{2}\b/.test(arrayToBeChecked[i]) && /CE/.test(arrayToBeChecked[i+1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["TwoDigitsYearCE"].push(parseInt(/\b\d{2}\b/.exec(arrayToBeChecked[i])[0]));
                }
                if (/\b\d{2}\b/.test(arrayToBeChecked[i]) && /AD/.test(arrayToBeChecked[i-1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["ADTwoDigitsYear"].push(parseInt(/\b\d{2}\b/.exec(arrayToBeChecked[i])[0]));
                }
                if (/\b\d{2}(–|-)\d{1,2}\b/.test(arrayToBeChecked[i])
                            && !/p+\.\s\d{2}/.test(arrayToBeChecked[i])
                            && !/p+\.\s/.test(arrayToBeChecked[i-1])
                            && /AD/.test(arrayToBeChecked[i+1])) {
                    var twoDashOneTwoDigitsArrayAD = [];
                    var matchTwoDashOneTwoDigitsAD = /\b(\d{2})(–|-)(\d{1,2})\b/.exec(arrayToBeChecked[i]);
                    twoDashOneTwoDigitsArrayAD[0] = parseInt(RegExp.$1);
                    twoDashOneTwoDigitsArrayAD[1] = parseInt(RegExp.$3);
                    arrayOfYears["TwoDigitsDashOneTwoDigitsAD"].push(twoDashOneTwoDigitsArrayAD);
                }
                if (/\b\d{2}(–|-)\d{1,2}\b/.test(arrayToBeChecked[i])
                            && !/p+\.\s\d{2}/.test(arrayToBeChecked[i])
                            && !/p+\.\s/.test(arrayToBeChecked[i-1])
                            && /CE/.test(arrayToBeChecked[i+1])) {
                    var twoDashOneTwoDigitsArrayCE = [];
                    var matchTwoDashOneTwoDigitsCE = /\b(\d{2})(–|-)(\d{1,2})\b/.exec(arrayToBeChecked[i]);
                    twoDashOneTwoDigitsArrayCE[0] = parseInt(RegExp.$1);
                    twoDashOneTwoDigitsArrayCE[1] = parseInt(RegExp.$3);
                    arrayOfYears["TwoDigitsDashOneTwoDigitsCE"].push(twoDashOneTwoDigitsArrayCE);
                }

                // #### 2 digits BC/BCE
                if (/\b\d{2}\b/.test(arrayToBeChecked[i]) && /BCE/.test(arrayToBeChecked[i+1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["TwoDigitsYearBCE"].push(parseInt(/\b\d{2}\b/.exec(arrayToBeChecked[i])[0]));
                }
                if (/\b\d{2}\b/.test(arrayToBeChecked[i]) && /BC/.test(arrayToBeChecked[i+1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["TwoDigitsYearBC"].push(parseInt(/\b\d{2}\b/.exec(arrayToBeChecked[i])[0]));
                }
                if (/\b\d{2}(–|-)\d{1,2}\b/.test(arrayToBeChecked[i])
                            && !/p+\.\s\d{2}/.test(arrayToBeChecked[i])
                            && !/p+\.\s/.test(arrayToBeChecked[i-1])
                            && /BC/.test(arrayToBeChecked[i+1])) {
                    var twoDashOneTwoDigitsArrayBC = [];
                    var matchTwoDashOneTwoDigitsBC = /\b(\d{2})(–|-)(\d{1,2})\b/.exec(arrayToBeChecked[i]);
                    twoDashOneTwoDigitsArrayBC[0] = parseInt(RegExp.$1);
                    twoDashOneTwoDigitsArrayBC[1] = parseInt(RegExp.$3);
                    arrayOfYears["TwoDigitsDashOneTwoDigitsBC"].push(twoDashOneTwoDigitsArrayBC);
                }
                if (/\b\d{2}(–|-)\d{1,2}\b/.test(arrayToBeChecked[i])
                            && !/p+\.\s\d{2}/.test(arrayToBeChecked[i])
                            && !/p+\.\s/.test(arrayToBeChecked[i-1])
                            && /BCE/.test(arrayToBeChecked[i+1])) {
                    var twoDashOneTwoDigitsArrayBCE = [];
                    var matchTwoDashOneTwoDigitsBCE = /\b(\d{2})(–|-)(\d{1,2})\b/.exec(arrayToBeChecked[i]);
                    twoDashOneTwoDigitsArrayBCE[0] = parseInt(RegExp.$1);
                    twoDashOneTwoDigitsArrayBCE[1] = parseInt(RegExp.$3);
                    arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"].push(twoDashOneTwoDigitsArrayBCE);
                }
            }

            // #### 1 digits
            if (/\b\d{1}\b/.test(arrayToBeChecked[i])) {
                // #### 1 digit AD/CE
                if (/\b\d{1}\b/.test(arrayToBeChecked[i]) && /AD/.test(arrayToBeChecked[i-1])) {
                    arrayOfYears["ADOneDigitYear"].push(parseInt(/\b\d{1}\b/.exec(arrayToBeChecked[i])[0]));
                }
                if (/\b\d{1}\b/.test(arrayToBeChecked[i])
                            && /AD/.test(arrayToBeChecked[i+1])
                            && !/–|-/.test(arrayToBeChecked[i])
                            && !/–|-/.test(arrayToBeChecked[i-1])) {
                    arrayOfYears["OneDigitYearAD"].push(parseInt(/\b\d{1}\b/.exec(arrayToBeChecked[i])[0]));
                }
                if (/\b\d{1}\b/.test(arrayToBeChecked[i])
                            && /CE/.test(arrayToBeChecked[i+1])
                            && !/–|-/.test(arrayToBeChecked[i])
                            && !/–|-/.test(arrayToBeChecked[i-1])) {
                    arrayOfYears["OneDigitYearCE"].push(parseInt(/\b\d{1}\b/.exec(arrayToBeChecked[i])[0]));
                }

                // #### 1 digit BC/CE
                if (/\b\d{1}\b/.test(arrayToBeChecked[i]) && /BCE/.test(arrayToBeChecked[i+1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["OneDigitYearBCE"].push(parseInt(/\b\d{1}\b/.exec(arrayToBeChecked[i])[0]));
                }
                if (/\b\d{1}\b/.test(arrayToBeChecked[i]) && /BC/.test(arrayToBeChecked[i+1]) && !/-|–/.test(arrayToBeChecked[i])) {
                    arrayOfYears["OneDigitYearBC"].push(parseInt(/\b\d{1}\b/.exec(arrayToBeChecked[i])[0]));
                }
            }
        }

        // #### for testing
        // for (var i = 0; i < arrayToBeChecked.length; i++) {
        //
        // }

        return arrayOfYears;
    }

    arrayOfYears = makeArrays(cleanedArray);
    console.log(arrayOfYears);

    return arrayOfYears;
}


// ##########################################################################
// #### making items from the array of arrays unique
function _main_unique (arrayOfYears) {
    function unique(arrayToBeChecked) {
        if (typeof arrayToBeChecked != 'undefined') {
            if (typeof(arrayToBeChecked[0])==="number") {
                return Array.from(new Set(arrayToBeChecked));
            } else if (typeof(arrayToBeChecked[0])==="object") {
                var seen = {};
                return arrayToBeChecked.filter(function(item) {
                    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
                });
            }
        }
    }


    arrayOfYears["FiveDigitsYearBC"] = unique(arrayOfYears["FiveDigitsYearBC"]);
    arrayOfYears["FiveDigitsYearBCE"] = unique(arrayOfYears["FiveDigitsYearBCE"]);

    arrayOfYears["FourDigitsYear"] = unique(arrayOfYears["FourDigitsYear"]);
    arrayOfYears["FourDigitsYearAD"] = unique(arrayOfYears["FourDigitsYearAD"]);
    arrayOfYears["FourDigitsYearCE"] = unique(arrayOfYears["FourDigitsYearCE"]);
    arrayOfYears["FourDigitsAndS"] = unique(arrayOfYears["FourDigitsAndS"]);
    arrayOfYears["FourDigitsDashFourDigits"] = unique(arrayOfYears["FourDigitsDashFourDigits"]);
    arrayOfYears["FourDigitsDashOneTwoDigits"] = unique(arrayOfYears["FourDigitsDashOneTwoDigits"]);
    arrayOfYears["FourDigitsYearBC"] = unique(arrayOfYears["FourDigitsYearBC"]);
    arrayOfYears["FourDigitsYearBCE"] = unique(arrayOfYears["FourDigitsYearBCE"]);
    arrayOfYears["FourDigitsAndSBC"] = unique(arrayOfYears["FourDigitsAndSBC"]);
    arrayOfYears["FourDigitsAndSBCE"] = unique(arrayOfYears["FourDigitsAndSBCE"]);

    arrayOfYears["ThreeDigitsYear"] = unique(arrayOfYears["ThreeDigitsYear"]);
    arrayOfYears["ThreeDigitsYearAD"] = unique(arrayOfYears["ThreeDigitsYearAD"]);
    arrayOfYears["ADThreeDigitsYear"] = unique(arrayOfYears["ADThreeDigitsYear"]);
    arrayOfYears["ThreeDigitsYearCE"] = unique(arrayOfYears["ThreeDigitsYearCE"]);
    arrayOfYears["ThreeDigitsAndS"] = unique(arrayOfYears["ThreeDigitsAndS"]);
    arrayOfYears["ThreeDigitsDashThreeDigits"] = unique(arrayOfYears["ThreeDigitsDashThreeDigits"]);
    arrayOfYears["ThreeDigitsDashOneTwoDigits"] = unique(arrayOfYears["ThreeDigitsDashOneTwoDigits"]);
    arrayOfYears["ThreeDigitsYearBC"] = unique(arrayOfYears["ThreeDigitsYearBC"]);
    arrayOfYears["ThreeDigitsYearBCE"] = unique(arrayOfYears["ThreeDigitsYearBCE"]);
    arrayOfYears["ThreeDigitsAndSBC"] = unique(arrayOfYears["ThreeDigitsAndSBC"]);
    arrayOfYears["ThreeDigitsAndSBCE"] = unique(arrayOfYears["ThreeDigitsAndSBCE"]);
    arrayOfYears["ThreeDigitsDashThreeDigitsBC"] = unique(arrayOfYears["ThreeDigitsDashThreeDigitsBC"]);
    arrayOfYears["ThreeDigitsDashThreeDigitsBCE"] = unique(arrayOfYears["ThreeDigitsDashThreeDigitsBCE"]);
    arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"] = unique(arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"]);
    arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"] = unique(arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"]);

    arrayOfYears["TwoDigitsYearAD"] = unique(arrayOfYears["TwoDigitsYearAD"]);
    arrayOfYears["ADTwoDigitsYear"] = unique(arrayOfYears["ADTwoDigitsYear"]);
    arrayOfYears["TwoDigitsYearCE"] = unique(arrayOfYears["TwoDigitsYearCE"]);
    arrayOfYears["TwoDigitsDashOneTwoDigitsAD"] = unique(arrayOfYears["TwoDigitsDashOneTwoDigitsAD"]);
    arrayOfYears["TwoDigitsDashOneTwoDigitsCE"] = unique(arrayOfYears["TwoDigitsDashOneTwoDigitsCE"]);
    arrayOfYears["TwoDigitsYearBC"] = unique(arrayOfYears["TwoDigitsYearBC"]);
    arrayOfYears["TwoDigitsYearBCE"] = unique(arrayOfYears["TwoDigitsYearBCE"]);
    arrayOfYears["TwoDigitsDashOneTwoDigitsBC"] = unique(arrayOfYears["TwoDigitsDashOneTwoDigitsBC"]);
    arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"] = unique(arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"]);

    arrayOfYears["OneDigitYearAD"] = unique(arrayOfYears["OneDigitYearAD"]);
    arrayOfYears["ADOneDigitYear"] = unique(arrayOfYears["ADOneDigitYear"]);
    arrayOfYears["OneDigitYearCE"] = unique(arrayOfYears["OneDigitYearCE"]);
    arrayOfYears["OneDigitYearBC"] = unique(arrayOfYears["OneDigitYearBC"]);
    arrayOfYears["OneDigitYearBCE"] = unique(arrayOfYears["OneDigitYearBCE"]);

    //console.log(arrayOfYears);
    return arrayOfYears;
}


// ##########################################################################
// #### replacement rules based on the years that are in the arrays of arrays
function _main_replacementRules (arrayOfYears) {
    // #### 5 Digits
    if (typeof arrayOfYears["FiveDigitsYearBC"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FiveDigitsYearBC"].length; i++) {
            if (arrayOfYears["FiveDigitsYearBC"][i] < 10001) {
                heYear = 10001 - arrayOfYears["FiveDigitsYearBC"][i];
                // console.log(heYear);
                var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["FiveDigitsYearBC"][i] + '\\sBC)\\b(?!–)(?!s)(?!E)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
                //console.log(regexString);
                var regex = new RegExp(regexString, "i");
                var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
                //var replaceString = heYear;
                //console.log(replaceString);
                $("*").replaceText(regex, replaceString);
            } else  {
                heYear = arrayOfYears["FiveDigitsYearBC"][i] - 10000;
                // console.log(heYear);
                var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["FiveDigitsYearBC"][i] + '\\sBC)\\b(?!–)(?!s)(?!E)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
                //console.log(regexString);
                var regex = new RegExp(regexString, "i");
                var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">BHE</a>]';
                //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
                //var replaceString = heYear;
                //console.log(replaceString);
                $("*").replaceText(regex, replaceString);
            }
        }
    }

    if (typeof arrayOfYears["FiveDigitsYearBCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FiveDigitsYearBCE"].length; i++) {
            if (arrayOfYears["FiveDigitsYearBCE"][i] < 10001) {
                heYear = 10001 - arrayOfYears["FiveDigitsYearBCE"][i];
                // console.log(heYear);
                var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["FiveDigitsYearBCE"][i] + '\\sBCE)\\b(?!–)(?!s)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
                //console.log(regexString);
                var regex = new RegExp(regexString, "i");
                var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
                //var replaceString = heYear;
                //console.log(replaceString);
                $("*").replaceText(regex, replaceString);
            } else  {
                heYear = arrayOfYears["FiveDigitsYearBCE"][i] - 10000;
                // console.log(heYear);
                var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["FiveDigitsYearBCE"][i] + '\\sBCE)\\b(?!–)(?!s)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
                //console.log(regexString);
                var regex = new RegExp(regexString, "i");
                var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">BHE</a>]';
                //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
                //var replaceString = heYear;
                //console.log(replaceString);
                $("*").replaceText(regex, replaceString);
            }
        }
    }


    // #### 4 Digits
    // #### AD/CE
    if (typeof arrayOfYears["FourDigitsYear"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FourDigitsYear"].length; i++) {
            heYear = arrayOfYears["FourDigitsYear"][i] + 10000;
            //console.log(heYear);
            var regexString = '\\b(' + arrayOfYears["FourDigitsYear"][i] + ')\\b(?!–|-)(?!s)(?!\\sAD)(?!\\sCE)(?!\\sBC)'; // combination of lookahead for en-dash, minus, BC, AD, and lookahead for s. ((?!([–])).|^)    ((?!([–|BC\\s|BCE\\s|AD\\s])).|^)- lookbehind for en-dash, not really working
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            //console.log(regex);
            var replaceString = '$1' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["FourDigitsYearAD"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FourDigitsYearAD"].length; i++) {
            heYear = arrayOfYears["FourDigitsYearAD"][i] + 10000;
            // console.log(heYear);
            var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["FourDigitsYearAD"][i] + '\\sAD)\\b(?!–)(?!s)(?!\\sBC)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["FourDigitsYearCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FourDigitsYearCE"].length; i++) {
            heYear = arrayOfYears["FourDigitsYearCE"][i] + 10000;
            // console.log(heYear);
            var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["FourDigitsYearCE"][i] + '\\sCE)\\b(?!–)(?!s)(?!\\sBC)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["FourDigitsAndS"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FourDigitsAndS"].length; i++) {
            heYear = arrayOfYears["FourDigitsAndS"][i] + 10000;
            // console.log(heYear);
            var regexString = arrayOfYears["FourDigitsAndS"][i] + 's(?!\\sBCE?)';
            var regex = new RegExp(regexString, "");
            var replaceString = arrayOfYears["FourDigitsAndS"][i] + 's' + ' [' + heYear + 's' + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["FourDigitsDashFourDigits"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FourDigitsDashFourDigits"].length; i++) {
            if (arrayOfYears["FourDigitsDashFourDigits"][i][0] < 2200) {
                heYearOne = arrayOfYears["FourDigitsDashFourDigits"][i][0] + 10000;
                heYearTwo = arrayOfYears["FourDigitsDashFourDigits"][i][1] + 10000;
                //console.log(heYearOne, heYearTwo);
                var regexString = '\\b(' + arrayOfYears["FourDigitsDashFourDigits"][i][0] + '(–|-)' + arrayOfYears["FourDigitsDashFourDigits"][i][1] + ')\\b(?!\\sBC)(?!\\sBCE)(?!-\\d+-\\d+-\\d+)';
                //console.log(regexString);
                var regex = new RegExp(regexString, "");
                var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
                //var replaceString = heYear;
                //console.log(replaceString);
                $("*").replaceText(regex, replaceString);
            }
        }
    }

    if (typeof arrayOfYears["FourDigitsDashOneTwoDigits"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FourDigitsDashOneTwoDigits"].length; i++) {
            if (arrayOfYears["FourDigitsDashOneTwoDigits"][i][0] < 2200) {
                heYearOne = arrayOfYears["FourDigitsDashOneTwoDigits"][i][0] + 10000;
                heYearTwo = arrayOfYears["FourDigitsDashOneTwoDigits"][i][1];
                //console.log(heYearOne, heYearTwo);
                var regexString = '\\b(' + arrayOfYears["FourDigitsDashOneTwoDigits"][i][0] + '(–|-)' + arrayOfYears["FourDigitsDashOneTwoDigits"][i][1] + ')\\b(?!\\sBC)(?!\\sBCE)(?!-\\d+-\\d+-\\d+)';
                //console.log(regexString);
                var regex = new RegExp(regexString, "");
                var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
                //var replaceString = heYear;
                //console.log(replaceString);
                $("*").replaceText(regex, replaceString);
            }
        }
    }

    // #### BC/BCE
    if (typeof arrayOfYears["FourDigitsYearBC"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FourDigitsYearBC"].length; i++) {
            heYear = 10001 - arrayOfYears["FourDigitsYearBC"][i];
            // console.log(heYear);
            var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["FourDigitsYearBC"][i] + '\\sBC)\\b(?!–)(?!s)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["FourDigitsYearBCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FourDigitsYearBCE"].length; i++) {
            heYear = 10001 - arrayOfYears["FourDigitsYearBCE"][i];
            // console.log(heYear);
            var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["FourDigitsYearBCE"][i] + '\\sBCE)\\b(?!–)(?!s)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["FourDigitsAndSBC"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FourDigitsAndSBC"].length; i++) {
            heYear = 10000 - arrayOfYears["FourDigitsAndSBC"][i];
            // console.log(heYear);
            var regexString = arrayOfYears["FourDigitsAndSBC"][i] + 's\\sBC(?!E)';
            var regex = new RegExp(regexString, "");
            var replaceString = arrayOfYears["FourDigitsAndSBC"][i] + 's BC' + ' [' + heYear + 's' + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["FourDigitsAndSBCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["FourDigitsAndSBCE"].length; i++) {
            heYear = 10000 - arrayOfYears["FourDigitsAndSBCE"][i];
            // console.log(heYear);
            var regexString = arrayOfYears["FourDigitsAndSBCE"][i] + 's\\sBCE';
            var regex = new RegExp(regexString, "");
            var replaceString = arrayOfYears["FourDigitsAndSBCE"][i] + 's BCE' + ' [' + heYear + 's' + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }


    // #### 3 Digits
    // #### AD/CE
    if (typeof arrayOfYears["ThreeDigitsYear"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsYear"].length; i++) {
            heYear = arrayOfYears["ThreeDigitsYear"][i] + 10000;
            // console.log(heYear);
            var regexString = '((?!([–|-])).|^)\\b(' + arrayOfYears["ThreeDigitsYear"][i] + ')\\b(?!–)(?!])(?!s)(?!\\sBC?E?)(?!\\sAD)(?!\/)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsYearAD"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsYearAD"].length; i++) {
            heYear = arrayOfYears["ThreeDigitsYearAD"][i] + 10000;
            //console.log(heYear);
            var regexString = '\\b(' + arrayOfYears["ThreeDigitsYearAD"][i] + '\\sAD)\\b'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = '$1' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ADThreeDigitsYear"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ADThreeDigitsYear"].length; i++) {
            heYear = arrayOfYears["ADThreeDigitsYear"][i] + 10000;
            //console.log(heYear);
            var regexString = '\\b(AD\\s' + arrayOfYears["ADThreeDigitsYear"][i] + ')\\b';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsYearCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsYearCE"].length; i++) {
            heYear = arrayOfYears["ThreeDigitsYearCE"][i] + 10000;
            // console.log(heYear);
            var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["ThreeDigitsYearCE"][i] + '\\sCE)\\b(?!–)(?!s)(?!\\sBC)(?!\\sAD)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsDashThreeDigits"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsDashThreeDigits"].length; i++) {
            heYearOne = arrayOfYears["ThreeDigitsDashThreeDigits"][i][0] + 10000;
            heYearTwo = arrayOfYears["ThreeDigitsDashThreeDigits"][i][1] + 10000;
            //console.log(heYearOne, heYearTwo);
            var regexString = '\\b(' + arrayOfYears["ThreeDigitsDashThreeDigits"][i][0] + '(–|-)' + arrayOfYears["ThreeDigitsDashThreeDigits"][i][1] + ')\\b(?!\\sBCE?)(?!-\\d+-\\d+)';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsDashOneTwoDigits"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsDashOneTwoDigits"].length; i++) {
            heYearOne = arrayOfYears["ThreeDigitsDashOneTwoDigits"][i][0] + 10000;
            heYearTwo = arrayOfYears["ThreeDigitsDashOneTwoDigits"][i][1];
            //console.log(heYearOne, heYearTwo);
            var regexString = '\\b(' + arrayOfYears["ThreeDigitsDashOneTwoDigits"][i][0] + '(–|-)' + arrayOfYears["ThreeDigitsDashOneTwoDigits"][i][1] + ')\\b(?!\\sBCE?)(?!-\\d+-\\d+-\\d+)';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsAndS"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsAndS"].length; i++) {
            heYear = arrayOfYears["ThreeDigitsAndS"][i] + 10000;
            // console.log(heYear);
            var regexString = arrayOfYears["ThreeDigitsAndS"][i] + 's(?!\\sBCE?)';
            var regex = new RegExp(regexString, "");
            var replaceString = arrayOfYears["ThreeDigitsAndS"][i] + 's' + ' [' + heYear + 's' + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    // #### BC/BCE
    if (typeof arrayOfYears["ThreeDigitsYearBC"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsYearBC"].length; i++) {
            heYear = 10001 - arrayOfYears["ThreeDigitsYearBC"][i];
            // console.log(heYear);
            var regexString = '((?!([–|\/])).|^)\\b(' + arrayOfYears["ThreeDigitsYearBC"][i] + '\\sBC)\\b(?!–)(?!s)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsYearBCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsYearBCE"].length; i++) {
            heYear = 10001 - arrayOfYears["ThreeDigitsYearBCE"][i];
            // console.log(heYear);
            var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["ThreeDigitsYearBCE"][i] + '\\sBCE)\\b(?!–)(?!s)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsAndSBC"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsAndSBC"].length; i++) {
            heYear = 10000 - arrayOfYears["ThreeDigitsAndSBC"][i];
            // console.log(heYear);
            var regexString = arrayOfYears["ThreeDigitsAndSBC"][i] + 's\\sBC(?!E)';
            var regex = new RegExp(regexString, "");
            var replaceString = arrayOfYears["ThreeDigitsAndSBC"][i] + 's BC' + ' [' + heYear + 's' + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsAndSBCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsAndSBCE"].length; i++) {
            heYear = 10000 - arrayOfYears["ThreeDigitsAndSBCE"][i];
            // console.log(heYear);
            var regexString = arrayOfYears["ThreeDigitsAndSBCE"][i] + 's\\sBCE';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            //console.log(regex);
            var replaceString = arrayOfYears["ThreeDigitsAndSBCE"][i] + 's BCE' + ' [' + heYear + 's' + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsDashThreeDigitsBC"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsDashThreeDigitsBC"].length; i++) {
            heYearOne = 10001 - arrayOfYears["ThreeDigitsDashThreeDigitsBC"][i][0];
            heYearTwo = 10001 - arrayOfYears["ThreeDigitsDashThreeDigitsBC"][i][1];
            //console.log(heYearOne, heYearTwo);
            var regexString = '\\b(' + arrayOfYears["ThreeDigitsDashThreeDigitsBC"][i][0] + '(–|-)' + arrayOfYears["ThreeDigitsDashThreeDigitsBC"][i][1] + '\\sBC)\\b(?!\\sBCE)';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsDashThreeDigitsBCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsDashThreeDigitsBCE"].length; i++) {
            heYearOne = 10001 - arrayOfYears["ThreeDigitsDashThreeDigitsBCE"][i][0];
            heYearTwo = 10001 - arrayOfYears["ThreeDigitsDashThreeDigitsBCE"][i][1];
            //console.log(heYearOne, heYearTwo);
            var regexString = '\\b(' + arrayOfYears["ThreeDigitsDashThreeDigitsBCE"][i][0] + '(–|-)' + arrayOfYears["ThreeDigitsDashThreeDigitsBCE"][i][1] + '\\sBCE)\\b(?!\\sBC)';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"].length; i++) {
            heYearOne = 10001 - arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"][i][0];
            // heYearTwo = 10001 - arrayOfYears["TwoDigitsDashOneTwoDigitsBC"][i][1];
            var intStringed = arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"][i][1].toString();
            //console.log(intStringed);
            if (intStringed[1]) {
                heYearTwo = 101 - arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"][i][1];
                var heYearTwoString = heYearTwo.toString();
                if(heYearTwo[2]) {
                    heYearTwo = heYearTwo.toString().slice(1);
                }
            } else {
                heYearTwo = 11 - arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"][i][1];
                //console.log(heYearTwo);
                heYearTwo = heYearTwo.toString();
                if(heYearTwo[1]) {
                    heYearTwo = heYearTwo.toString().slice(1);
                    // console.log(heYearTwo);
                    if(heYearTwo[0] == '0') {
                        var heYearOneStringed = heYearOne.toString();
                        // console.log(heYearOneStringed[2]);
                        heYearOneReInt = parseInt(heYearOneStringed[2]) + 1;
                        heYearTwo = heYearOneReInt + heYearTwo[0];
                    }
                }
            }
            //console.log(heYearOne, heYearTwo);
            var regexString = '\\b(' + arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"][i][0] + '(–|-)' + arrayOfYears["ThreeDigitsDashOneTwoDigitsBC"][i][1] + '\\sBC)\\b(?!\\sBCE)';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"].length; i++) {
            heYearOne = 10001 - arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"][i][0];
            // heYearTwo = 10001 - arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"][i][1];
            var intStringed = arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"][i][1].toString();
            //console.log(intStringed);
            if (intStringed[1]) {
                heYearTwo = 101 - arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"][i][1];
                var heYearTwoString = heYearTwo.toString();
                if(heYearTwo[2]) {
                    heYearTwo = heYearTwo.toString().slice(1);
                }
            } else {
                heYearTwo = 11 - arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"][i][1];
                //console.log(heYearTwo);
                heYearTwo = heYearTwo.toString();
                if(heYearTwo[1]) {
                    heYearTwo = heYearTwo.toString().slice(1);
                    // console.log(heYearTwo);
                    if(heYearTwo[0] == '0') {
                        var heYearOneStringed = heYearOne.toString();
                        // console.log(heYearOneStringed[2]);
                        heYearOneReInt = parseInt(heYearOneStringed[2]) + 1;
                        heYearTwo = heYearOneReInt + heYearTwo[0];
                    }
                }
            }
            //console.log(heYearOne, heYearTwo);
            var regexString = '\\b(' + arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"][i][0] + '(–|-)' + arrayOfYears["ThreeDigitsDashOneTwoDigitsBCE"][i][1] + '\\sBCE)\\b(?!\\sBC)';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }


    // #### 2 Digits
    // #### AD/CE
    if (typeof arrayOfYears["TwoDigitsYearAD"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["TwoDigitsYearAD"].length; i++) {
            heYear = arrayOfYears["TwoDigitsYearAD"][i] + 10000;
            // console.log(heYear);
            var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["TwoDigitsYearAD"][i] + '\\sAD)\\b(?!–)(?!s)(?!\\sBC)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ADTwoDigitsYear"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ADTwoDigitsYear"].length; i++) {
            heYear = arrayOfYears["ADTwoDigitsYear"][i] + 10000;
            //console.log(heYear);
            var regexString = '(AD\\s' + arrayOfYears["ADTwoDigitsYear"][i] + ')'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = '$1' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["TwoDigitsYearCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["TwoDigitsYearCE"].length; i++) {
            heYear = arrayOfYears["TwoDigitsYearCE"][i] + 10000;
            // console.log(heYear);
            var regexString = '((?!([–])).|^)\\b(' + arrayOfYears["TwoDigitsYearCE"][i] + '\\sCE)\\b(?!–)(?!s)(?!\\sBC)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["TwoDigitsDashOneTwoDigitsAD"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["TwoDigitsDashOneTwoDigitsAD"].length; i++) {
            heYearOne = arrayOfYears["TwoDigitsDashOneTwoDigitsAD"][i][0] + 10000;
            heYearTwo = arrayOfYears["TwoDigitsDashOneTwoDigitsAD"][i][1];
            //console.log(heYearOne, heYearTwo);
            var regexString = '\\b(' + arrayOfYears["TwoDigitsDashOneTwoDigitsAD"][i][0] + '(–|-)' + arrayOfYears["TwoDigitsDashOneTwoDigitsAD"][i][1] + '\\sAD)\\b(?!\\sBC)(?!\\sBCE)(?!\\sCE)';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["TwoDigitsDashOneTwoDigitsCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["TwoDigitsDashOneTwoDigitsCE"].length; i++) {
            heYearOne = arrayOfYears["TwoDigitsDashOneTwoDigitsCE"][i][0] + 10000;
            heYearTwo = arrayOfYears["TwoDigitsDashOneTwoDigitsCE"][i][1];
            //console.log(heYearOne, heYearTwo);
            var regexString = '\\b(' + arrayOfYears["TwoDigitsDashOneTwoDigitsCE"][i][0] + '(–|-)' + arrayOfYears["TwoDigitsDashOneTwoDigitsCE"][i][1] + '\\sCE)\\b(?!\\sBC)(?!\\sBCE)(?!\\sAD)';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    // #### BC/BCE
    if (typeof arrayOfYears["TwoDigitsYearBC"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["TwoDigitsYearBC"].length; i++) {
            heYear = 10001 - arrayOfYears["TwoDigitsYearBC"][i];
            // console.log(heYear);
            var regexString = '((?!([–|-])).|^)\\b(' + arrayOfYears["TwoDigitsYearBC"][i] + '\\sBC)\\b(?!–)(?!s)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["TwoDigitsYearBCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["TwoDigitsYearBCE"].length; i++) {
            heYear = 10001 - arrayOfYears["TwoDigitsYearBCE"][i];
            // console.log(heYear);
            var regexString = '((?!([–|-])).|^)\\b(' + arrayOfYears["TwoDigitsYearBCE"][i] + '\\sBCE)\\b(?!–)(?!s)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["TwoDigitsDashOneTwoDigitsBC"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["TwoDigitsDashOneTwoDigitsBC"].length; i++) {
            heYearOne = 10001 - arrayOfYears["TwoDigitsDashOneTwoDigitsBC"][i][0];
            var intStringed = arrayOfYears["TwoDigitsDashOneTwoDigitsBC"][i][1].toString();
            //console.log(intStringed);
            if (intStringed[1]) {
                heYearTwo = 101 - arrayOfYears["TwoDigitsDashOneTwoDigitsBC"][i][1];
                var heYearTwoString = heYearTwo.toString();
                if(heYearTwo[2]) {
                    heYearTwo = heYearTwo.toString().slice(1);
                }
            } else {
                heYearTwo = 11 - arrayOfYears["TwoDigitsDashOneTwoDigitsBC"][i][1];
                heYearTwo = heYearTwo.toString();
                //console.log(heYearTwo);
                if (heYearTwo[1]) {
                    heYearTwo = heYearTwo.toString().slice(1);
                    //console.log(heYearTwo);
                    if(heYearTwo[0] == '0') {
                        var heYearOneStringed = heYearOne.toString();
                        //console.log(heYearOneStringed[2]);
                        heYearOneReInt = parseInt(heYearOneStringed[2]) + 1;
                        heYearTwo = heYearOneReInt + heYearTwo[0];
                    }
                }
            }
            //console.log(heYearOne, heYearTwo);
            var regexString = '\\b(' + arrayOfYears["TwoDigitsDashOneTwoDigitsBC"][i][0] + '(–|-)' + arrayOfYears["TwoDigitsDashOneTwoDigitsBC"][i][1] + '\\sBC)\\b';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"].length; i++) {
            heYearOne = 10001 - arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"][i][0];
            var intStringed = arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"][i][1].toString();
            //console.log(intStringed);
            if (intStringed[1]) {
                heYearTwo = 101 - arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"][i][1];
                var heYearTwoString = heYearTwo.toString();
                if(heYearTwo[2]) {
                    heYearTwo = heYearTwo.toString().slice(1);
                }
            } else {
                heYearTwo = 11 - arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"][i][1];
                heYearTwo = heYearTwo.toString();
                if(heYearTwo[1]) {
                    heYearTwo = heYearTwo.toString().slice(1);
                    // console.log(heYearTwo);
                    if(heYearTwo[0] == '0') {
                        var heYearOneStringed = heYearOne.toString();
                        // console.log(heYearOneStringed[2]);
                        heYearOneReInt = parseInt(heYearOneStringed[2]) + 1;
                        heYearTwo = heYearOneReInt + heYearTwo[0];
                    }
                }
            }
            //console.log(heYearOne, heYearTwo);
            var regexString = '\\b(' + arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"][i][0] + '(–|-)' + arrayOfYears["TwoDigitsDashOneTwoDigitsBCE"][i][1] + '\\sBCE)\\b';
            //console.log(regexString);
            var regex = new RegExp(regexString, "");
            var replaceString = '$1' + ' [' + heYearOne + '–' + heYearTwo + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }


    // #### 1 Digit
    // #### AD/CE
    if (typeof arrayOfYears["OneDigitYearAD"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["OneDigitYearAD"].length; i++) {
            heYear = arrayOfYears["OneDigitYearAD"][i] + 10000;
            // console.log(heYear);
            var regexString = '\\b(' + arrayOfYears["OneDigitYearAD"][i] + '\\sAD)\\b(?!–)(?!s)(?!\\sBC)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $1' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["ADOneDigitYear"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["ADOneDigitYear"].length; i++) {
            heYear = arrayOfYears["ADOneDigitYear"][i] + 10000;
            // console.log(heYear);
            var regexString = '\\b(AD\\s' + arrayOfYears["ADOneDigitYear"][i] + ')\\b(?!–)(?!s)(?!\\sBC)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $1' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["OneDigitYearCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["OneDigitYearCE"].length; i++) {
            heYear = arrayOfYears["OneDigitYearCE"][i] + 10000;
            // console.log(heYear);
            var regexString = '((?!([–|-])).|^)\\b(' + arrayOfYears["OneDigitYearCE"][i] + '\\sCE)\\b(?!–)(?!s)(?!\\sBC)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    // #### BC/BCE
    if (typeof arrayOfYears["OneDigitYearBC"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["OneDigitYearBC"].length; i++) {
            heYear = 10001 - arrayOfYears["OneDigitYearBC"][i];
            // console.log(heYear);
            var regexString = '((?!([–|-|\/])).|^)\\b(' + arrayOfYears["OneDigitYearBC"][i] + '\\sBC)\\b(?!–)(?!s)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }

    if (typeof arrayOfYears["OneDigitYearBCE"] != 'undefined') {
        for(var i = 0; i < arrayOfYears["OneDigitYearBCE"].length; i++) {
            heYear = 10001 - arrayOfYears["OneDigitYearBCE"][i];
            // console.log(heYear);
            var regexString = '((?!([–|-|\/])).|^)\\b(' + arrayOfYears["OneDigitYearBCE"][i] + '\\sBCE)\\b(?!–)(?!s)'; // combination of lookbehind and lookahead for en-dash, and lookahead for s
            //console.log(regexString);
            var regex = new RegExp(regexString, "i");
            var replaceString = ' $3' + ' [' + heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
            //var replaceString = heYear + ' <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>';
            //var replaceString = heYear;
            //console.log(replaceString);
            $("*").replaceText(regex, replaceString);
        }
    }
}


// ##########################################################################
// #### Century replacement rules
function _main_centuryReplacement () {
    for(var i = 1; i < 25; i++) {
        if (i < 10) {
            if (i == 1) {
                regexString = '\\b' + i + 'st century' + '\\b(?!\\sBC)';
                regexStringDash = '\\b' + i + 'st-century' + '\\b(?!\\sBC)';
                regexStringBC = '\\b' + i + 'st century' + '\\b\\sBCE?';
                regexStringBCDash = '\\b' + i + 'st-century' + '\\b\\sBCE?';
                regex = new RegExp (regexString, "");
                regexDash = new RegExp (regexStringDash, "");
                regexBC = new RegExp (regexStringBC, "");
                regexBCDash = new RegExp (regexStringBCDash, "");
                centuryBC = 100 - i;
                replaceString = i + 'st century' + ' [10' + i + 'st century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringDash = i + 'st-century' + ' [10' + i + 'st century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBC = i + 'st century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBCDash = i + 'st-century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                $("*").replaceText(regex, replaceString);
                $("*").replaceText(regexDash, replaceStringDash);
                $("*").replaceText(regexBC, replaceStringBC);
                $("*").replaceText(regexBCDash, replaceStringBCDash);
            } else if (i == 2) {
                regexString = '\\b' + i + 'nd century' + '\\b(?!\\sBC)';
                regexStringDash = '\\b' + i + 'nd-century' + '\\b(?!\\sBC)';
                regexStringBC = '\\b' + i + 'nd century' + '\\b\\sBCE?';
                regexStringBCDash = '\\b' + i + 'nd-century' + '\\b\\sBCE?';
                regex = new RegExp (regexString, "");
                regexDash = new RegExp (regexStringDash, "");
                regexBC = new RegExp (regexStringBC, "");
                regexBCDash = new RegExp (regexStringBCDash, "");
                centuryBC = 100 - i;
                replaceString = i + 'nd century' + ' [10' + i + 'nd century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringDash = i + 'nd-century' + ' [10' + i + 'nd century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBC = i + 'nd century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBCDash = i + 'nd-century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                $("*").replaceText(regex, replaceString);
                $("*").replaceText(regexDash, replaceStringDash);
                $("*").replaceText(regexBC, replaceStringBC);
                $("*").replaceText(regexBCDash, replaceStringBCDash);
            } else if (i == 3) {
                regexString = '\\b' + i + 'rd century' + '\\b(?!\\sBC)';
                regexStringDash = '\\b' + i + 'rd-century' + '\\b(?!\\sBC)';
                regexStringBC = '\\b' + i + 'rd century' + '\\b\\sBCE?';
                regexStringBCDash = '\\b' + i + 'rd-century' + '\\b\\sBCE?';
                regex = new RegExp (regexString, "");
                regexDash = new RegExp (regexStringDash, "");
                regexBC = new RegExp (regexStringBC, "");
                regexBCDash = new RegExp (regexStringBCDash, "");
                centuryBC = 100 - i;
                replaceString = i + 'rd century' + ' [10' + i + 'rd century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringDash = i + 'rd-century' + ' [10' + i + 'rd century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBC = i + 'rd century BC' + ' [' + + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBCDash = i + 'rd-century BC' + ' [' + + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                $("*").replaceText(regex, replaceString);
                $("*").replaceText(regexDash, replaceStringDash);
                $("*").replaceText(regexBC, replaceStringBC);
                $("*").replaceText(regexBCDash, replaceStringBCDash);
            } else {
                regexString = '\\b' + i + 'th century' + '\\b(?!\\sBC)';
                regexStringDash = '\\b' + i + 'th-century' + '\\b(?!\\sBC)';
                regexStringBC = '\\b' + i + 'th century' + '\\b\\sBCE?';
                regexStringBCDash = '\\b' + i + 'th-century' + '\\b\\sBCE?';
                regex = new RegExp (regexString, "");
                regexDash = new RegExp (regexStringDash, "");
                regexBC = new RegExp (regexStringBC, "");
                regexBCDash = new RegExp (regexStringBCDash, "");
                centuryBC = 100 - i;
                replaceString = i + 'th century' + ' [10' + i + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringDash = i + 'th-century' + ' [10' + i + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBC = i + 'th century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBCDash = i + 'th-century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                $("*").replaceText(regex, replaceString);
                $("*").replaceText(regexDash, replaceStringDash);
                $("*").replaceText(regexBC, replaceStringBC);
                $("*").replaceText(regexBCDash, replaceStringBCDash);
            }
        } else {
            if (i == 21) {
                regexString = '\\b' + i + 'st century' + '\\b(?!\\sBC)';
                regexStringDash = '\\b' + i + 'st-century' + '\\b(?!\\sBC)';
                regexStringBC = '\\b' + i + 'st century' + '\\b\\sBCE?';
                regexStringBCDash = '\\b' + i + 'st-century' + '\\b\\sBCE?';
                regex = new RegExp (regexString, "");
                regexDash = new RegExp (regexStringDash, "");
                regexBC = new RegExp (regexStringBC, "");
                regexBCDash = new RegExp (regexStringBCDash, "");
                centuryBC = 100 - i;
                replaceString = i + 'st century' + ' [1' + i + 'st century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringDash = i + 'st-century' + ' [1' + i + 'st century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBC = i + 'st century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBCDash = i + 'st-century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                $("*").replaceText(regex, replaceString);
                $("*").replaceText(regexDash, replaceStringDash);
                $("*").replaceText(regexBC, replaceStringBC);
                $("*").replaceText(regexBCDash, replaceStringBCDash);
            } else if (i == 22) {
                regexString = '\\b' + i + 'nd century' + '\\b(?!\\sBC)';
                regexStringDash = '\\b' + i + 'nd-century' + '\\b(?!\\sBC)';
                regexStringBC = '\\b' + i + 'nd century' + '\\b\\sBCE?';
                regexStringBCDash = '\\b' + i + 'nd-century' + '\\b\\sBCE?';
                regex = new RegExp (regexString, "");
                regexDash = new RegExp (regexStringDash, "");
                regexBC = new RegExp (regexStringBC, "");
                regexBCDash = new RegExp (regexStringBCDash, "");
                centuryBC = 100 - i;
                replaceString = i + 'nd century' + ' [1' + i + 'nd century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringDash = i + 'nd-century' + ' [1' + i + 'nd century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBC = i + 'nd century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBCDash = i + 'nd-century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                $("*").replaceText(regex, replaceString);
                $("*").replaceText(regexDash, replaceStringDash);
                $("*").replaceText(regexBC, replaceStringBC);
                $("*").replaceText(regexBCDash, replaceStringBCDash);
            } else if (i == 23) {
                regexString = '\\b' + i + 'rd century' + '\\b(?!\\sBC)';
                regexStringDash = '\\b' + i + 'rd-century' + '\\b(?!\\sBC)';
                regexStringBC = '\\b' + i + 'rd century' + '\\b\\sBCE?';
                regexStringBCDash = '\\b' + i + 'rd-century' + '\\b\\sBCE?';
                regex = new RegExp (regexString, "");
                regex = new RegExp (regexStringDash, "");
                regexBC = new RegExp (regexStringBC, "");
                regexBC = new RegExp (regexStringBCDash, "");
                centuryBC = 100 - i;
                replaceString = i + 'rd century' + ' [1' + i + 'rd century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringDash = i + 'rd-century' + ' [1' + i + 'rd century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBC = i + 'rd century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBCDash = i + 'rd-century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                $("*").replaceText(regex, replaceString);
                $("*").replaceText(regexDash, replaceStringDash);
                $("*").replaceText(regexBC, replaceStringBC);
                $("*").replaceText(regexBCDash, replaceStringBCDash);
            } else {
                regexString = '\\b' + i + 'th century' + '\\b(?!\\sBC)';
                regexStringDash = '\\b' + i + 'th-century' + '\\b(?!\\sBC)';
                regexStringBC = '\\b' + i + 'th century' + '\\b\\sBC';
                regexStringBCDash = '\\b' + i + 'th-century' + '\\b\\sBC';
                regex = new RegExp (regexString, "");
                regexDash = new RegExp (regexStringDash, "");
                regexBC = new RegExp (regexStringBC, "");
                regexBCDash = new RegExp (regexStringBCDash, "");
                centuryBC = 100 - i;
                replaceString = i + 'th century' + ' [1' + i + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringDash = i + 'th-century' + ' [1' + i + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBC = i + 'th century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                replaceStringBCDash = i + 'th-century BC' + ' [' + centuryBC + 'th century <a href=\"https://en.wikipedia.org/wiki/Holocene_calendar\">HE</a>]';
                $("*").replaceText(regex, replaceString);
                $("*").replaceText(regexDash, replaceStringDash);
                $("*").replaceText(regexBC, replaceStringBC);
                $("*").replaceText(regexBCDash, replaceStringBCDash);
            }
        }
    }
}
