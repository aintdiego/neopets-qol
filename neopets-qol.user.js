// ==UserScript==
// @name         Neopets - QoL changes
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Don't make me scroll all the way down, pls
// @author       Me
// @match        http*://www.neopets.com/island/tradingpost.phtml
// @match        http*://www.neopets.com/auctions.phtml*
// @grant        none
// @require    	 http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function inURL(substr) {
    return document.URL.includes(substr);
}

if (inURL('tradingpost')) {
    // Add additional "Create new trade!" at the top of the page.
    // This way you don't have to scroll all the way down if you already have a lot of trades up.
    $('input[value=\'Create a new trade!\']').parents().eq(2).prepend($('input[value=\'Create a new trade!\']').parents().eq(0).clone().attr('id', 'top-button'));
    $('#top-button').css("text-align", "center").before("<br />").after("<br />");
}

if (inURL('auctions')) {
    function formatToCurrenty(amount) {
        amount = (parseInt(amount)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return amount.substr(0, amount.length - 2);
    }

    function getHtml(amount) {
        return `<b>${amount}</b> NP`;
    }

    // Format neopoints to read amounts more easily
    $('a[href*="auction_id"]:not(:has(img))').each(function(k,v) {
        let last_bid = $(v).parent().parent().children().eq(5).text();
        last_bid = last_bid.substr(0, last_bid.length - 3);
        last_bid = formatToCurrenty(last_bid);

        let current_price = $(v).parent().parent().children().eq(6).text();
        current_price = current_price.substr(0, current_price.length - 3);
        current_price = formatToCurrenty(current_price);

        $(v).parent().parent().children().eq(5).html(getHtml(last_bid));
        $(v).parent().parent().children().eq(6).html(getHtml(current_price));
    });
}
