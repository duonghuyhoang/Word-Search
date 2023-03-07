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
            const item = res[i];
            let means = [];
            if( Array.isArray(item.defs) ) {
                means = item.defs.map(def => 
                
                ` <li>${def}</li>`)
               
            }
            
            
            listWord.push( `
                <li>
                <p><strong>${res[i].word}</strong></p>
                <br> <ul>${means.join('')}</ul>
                </li>
                ` 
            ) 
             
            
        }
           $('.render-search').append(listWord)
             
        
 
    } 
    
    const loading = () => {
        $('.loader').show()
        setTimeout(() => {
            $('.loader').hide()
        },1000)
    }
    const deleteWord = () => {
        $('.ti-close').click(function (e) { 
            e.preventDefault();
           
           $('.content').hide();
            });
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
        loading()
        $('.content').show();
        deleteWord()
        setTimeout(() => {
            callApi()
        },700)
        
    }
    $('#search-button').on('click', displayResult);

    $('.nav-item').on('click',function(e) {
        $('.nav-item').removeClass('active')
        $(this).addClass('active')
        
        nav = $(document).find('li.active').attr('id')
        displayResult(e)
    });
    $('#search-input').keyup(function (e) { 
         if ( $('#search-input').val() !== '') {
            $('.ti-close').css({'display': "block"})
        }else {
            $('.ti-close').css({'display': "none"})
        }
    })  
    $('.ti-close').click(function (e) { 
        e.preventDefault();
        $('#search-input').val('')
        $('.ti-close').css({'display': "none"})
        });
    
   
})
