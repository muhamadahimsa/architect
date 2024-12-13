function info() {
    const transition = document.querySelector('.info')
    const links = document.querySelectorAll('.info-nav span');
    links.forEach(function(e){
        e.addEventListener('click', function() {
            gsap.to(transition, {
                y: '100%',
                duration: .5,
            })
            console.log('hello world')
        })
    })
}

export default info();