$(function() {
    //Створення масиву з значеннями backgroundPosition
    let x2 = 0;
    let y2 = 0;
    changeline2 = 0;
    let array = [`0px 0px`];
    for (let i = 0; i < 15; i++) {
        x2 += 100;
        changeline2++;
        if (changeline2 == 4) {
            changeline2 = 0;
            y2 += 100;
            x2 = 0;
        }
        array.push(`-${x2}px -${y2}px`)
    }
    // Створення масиву з рандомними backgroundPosition.
    let arrayRandom = [].concat(array)
    arrayRandom.sort(() => Math.random() - 0.5);

    // Розбиття картинки
    $('.puzzle').each(function(index) {
            $(this).css({
                backgroundPosition: `${arrayRandom[index]}`
            });
            let j = array.indexOf(`${arrayRandom[index]}`)
            $(this).addClass(`cl${j}`)
        })
        // Перевірка на правильність 
    for (let i = 0; i < 15; i++) {
        $('.right').children().eq(i).droppable({
            accept: `.cl${i}`,
            drop: function() {
                $('.right').children().eq(i).text('1');
            }
        });
    }


    // Кнопка start game
    let startID;
    let remainder;
    $('.start').click(() => {
            $('.puzzle').draggable({
                grid: [100, 100],
                containment: '.containers'
            });
            $('.start').attr('disabled', 'true');
            $('.check').removeAttr('disabled');
            $('.start').css('backgroundColor', 'rgb(255, 182, 155)');
            $('.check').css('backgroundColor', 'rgb(255, 69, 0)')
            let datestart2 = Date.now();
            startID = setInterval(() => {
                let datecurrent = Date.now();
                remainder = 60000 - (datecurrent - datestart2);
                let cSecond = Math.floor((remainder / 1000) % 60);
                if (cSecond < 10) cSecond = '0' + cSecond;
                if (cSecond == '00') {
                    $('.time').text(`00:00`);
                    clearTimeout(startID);
                    let res = 0;
                    for (let i = 0; i < 15; i++) {
                        res += parseInt($('.right').children().eq(i).text())
                    }
                    if (res == 15) {
                        $('.win').show();
                        $('.background').show();
                        $('.puzzle').draggable('destroy');
                        $('.check').attr('disabled', 'true');
                        $('.check').css('backgroundColor', 'rgb(255, 182, 155)');
                    } else {
                        $('.lose').show();
                        $('.background').show();
                        $('.check').attr('disabled', 'true');
                        $('.check').css('backgroundColor', 'rgb(255, 182, 155)');
                        $('.puzzle').draggable('destroy');
                    }
                } else {
                    $('.time').text(`00:${cSecond}`);
                    $('h2').text(`You still have time, you sure?00:${cSecond}`);
                }
            })
        })
        // Кнопка check result
    $('.check').click(function() {
        $('.stillHaveTime').show();
        $('.background').show();
    })

    // Кнопки закриття
    $('.close').click(function() {
        $('.stillHaveTime').hide();
        $('.background').hide();
    })

    $('.close2').click(function() {
        $('.lose').hide();
        $('.background').hide();
    })

    $('.close3').click(function() {
        $('.win').hide();
        $('.background').hide();
    })

    // Кнопка check 
    $('.check2').click(function() {
        $('.puzzle').draggable('destroy');
        $('.stillHaveTime').hide();
        let res = 0;
        for (let i = 0; i < 15; i++) {
            res += parseInt($('.right').children().eq(i).text())
        }
        if (res == 15) {
            $('.win').show();
            $('.background').show();
            $('.check').attr('disabled', 'true');
            $('.check').css('backgroundColor', 'rgb(255, 182, 155)');
            clearTimeout(startID);
        } else {
            $('.lose').show();
            $('.background').show();
            clearTimeout(startID);
            $('.check').attr('disabled', 'true');
            $('.check').css('backgroundColor', 'rgb(255, 182, 155)');
        }
    })
})