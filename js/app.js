//defaults
var wDef = 300,
    hDef = 200,
    mqDef = '',
    leDef = '100vw';

//tag template
var tag = '' +
        '\n' +
        '<img src="%FALLBACK%"\n' +
        '  srcset="' +
        '%SRCSET%' +
        '"\n' +
        '  sizes="' +
        '%SIZES%' +
        '"\n' +
        '  alt="Placeholder" \n' +
        '/>',

    placeholdImg = "http://placehold.it/";


$(document).on('click', '.button', function () {
    var srcset = '', sizes = '', fallback = '';

    //img attribute will get last entry
    var w = $('.js-w:last').val() != '' ? $('.js-w:last').val(): wDef;
    var h = $('.js-h:last').val() != '' ? $('.js-h:last').val(): hDef;
    fallback = placeholdImg + w + 'x' + h;

    //generate lists
    $('.js-srcset').each(function () {
        var srcRootElem = $(this);
        w = srcRootElem.find('.js-w').val() != '' ? srcRootElem.find('.js-w').val() : wDef;
        h = srcRootElem.find('.js-h').val() != '' ? srcRootElem.find('.js-h').val() : hDef;
        srcset += '\n\t' + placeholdImg + w + 'x' + h + ' ' + w + 'w,';
    });
    $('.js-sizes').each(function () {
        var sizeRootElem = $(this);
        var mq = sizeRootElem.find('.js-mq').val() != '' ? sizeRootElem.find('.js-mq').val() : mqDef;
        var le = sizeRootElem.find('.js-length').val() != '' ? sizeRootElem.find('.js-length').val() : leDef;
        sizes += '\n\t' + mq + ' ' + le + ',';
    });

    var row = $(this).closest('.row').clone();
    row.find('input').val('');
    $(this).closest('.row').after(row);

    //fill generated lists in template
    var replacements = {'%FALLBACK%': fallback, '%SRCSET%': srcset.slice(0, -1), '%SIZES%': sizes.slice(0, -1)};
    var output = tag.replace(/%\w+%/g, function (all) {
        return replacements[all] || all;
    });

    $('.js-output').text(output);
    $('.js-image-output').html(output)

});
