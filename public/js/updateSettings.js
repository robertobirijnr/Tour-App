
const updateSettings = async (data,type)=>{
    try {
        const url =
        type==='password'?
        'http://localhost:3000/api/v1/users/passwordupdate':
        'http://localhost:3000/api/v1/users/updateMe'
        const res = await axios ({
            method:'PATCH',
            url,
            data
        })
        if(res.data.status==='success')
        alert('success')
    } catch (err) {
        alert(err.response.data.message)
    }
}

const updateData = document.querySelector('.form-user-data');
if(updateData)
updateData.addEventListener('submit',e=>{
    e.preventDefault();
    const form = new formData();
    form.append('name',document.getElementById('name').value);
    form.append('email',document.getElementById('email').value);
    form.append('photo',document.getElementById('photo').files[0]);
    updateSettings(form,'data')
});

const updatepassword = document.querySelector('.form-user-password');
if(updatepassword)
updatepassword.addEventListener('submit',async e=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent='updating...'
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
   await updateSettings({passwordCurrent,password,passwordConfirm},'password')

   document.querySelector('.btn--save-password').textContent='Save password'
   document.getElementById('password-current').value='';
   document.getElementById('password').value='';
   document.getElementById('password-confirm').value='';
})