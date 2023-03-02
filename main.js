
$(document).ready(() => {
    const url = 'https://api.datamuse.com/words?';
    const metadata = '&md=d'
    let nav = $(document).find('li.active').attr('id')
    
    const renderResponse = (res) => {
        const listWord = [];
        let list = Math.min(15, res.length)
        if (!res.length) {
            $('.error-search').html('<strong>Không tìm thấy kết quả </strong>')
        }
        for (let i = 0; i < list; i++) {
            listWord.push( `
                <li>
                <p><strong>${res[i].word}</strong></p>
                <br> <span>${res[i].defs}</span>
                </li>
                ` 
            )
        }
        for (let i = 0; i < list; i++) {
            $('.render-search').append(listWord[i])
            
        }
    }
    const callApi = async () => {
        const valueSearch = $('#search-input').val()
        const response = `${url}${nav}=${valueSearch}${metadata}`;
        const res = await fetch(response,{cache:'no-cache'})    
        const getRes = await res.json();
        renderResponse(getRes)
            
    }
    const displayResult = (e) => {
        e.preventDefault();
        $('.list-search').css({'display': "block"})
        $('.render-search').empty();
        $('.error-search').empty();
        callApi()
    }
    $('#search-button').on('click', displayResult);

    $('.nav-item').on('click',function(e) {
        $('.nav-item').removeClass('active')
        $(this).addClass('active')
        nav = $(document).find('li.active').attr('id')
        displayResult(e)
    });
})
