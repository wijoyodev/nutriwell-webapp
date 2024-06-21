import Swal from 'sweetalert2';

export const checkResponseMessage = async (isSuccess, title, text) => {
    if( isSuccess === true ){
        Swal.fire({
          title: title,
          text: text,
          icon: 'success',
        })
    }else{
        if( text === "" ){
            localStorage.clear()
            Swal.fire({
                title: title,
                text: text,
                icon: 'error',
                confirmButtonColor: '#1b4460',
            })
            const myTimeout = setTimeout(reloadFunc, 2000);
            function reloadFunc() {
              window.location.reload();
            }
            myTimeout()
        }else{
            Swal.fire({
                title: title,
                text: text,
                icon: 'error',
                confirmButtonColor: '#1b4460',
            })
        }
    }
  }