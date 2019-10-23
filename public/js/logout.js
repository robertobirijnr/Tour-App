const logout = async() =>{
    try {
        const res = await axios({
            method:'GET',
            url:'http://localhost:3000/api/v1/users/logout'
        })
        if(res.data.status==='success') location.reload(true);
    } catch (err) {
       aconsole.log(err.response) 
    }
}
const logoutBtn = document.querySelector('.nav__el--logout');
if(logoutBtn) logoutBtn.addEventListener('click',logout)