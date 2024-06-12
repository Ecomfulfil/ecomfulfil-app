import Swal, { SweetAlertIcon } from 'sweetalert2';

// Define the type for the callback functions
type CallbackFunction = () => void;

export const showAlert = ({
  title,
  html,
  icon,
  onSuccess,
  onFailure,
}: {
  title: string;
  html: string;
  icon: SweetAlertIcon;
  onSuccess?: CallbackFunction;
  onFailure?: CallbackFunction;
}) => {
  Swal.fire({
    title: `<strong>${title}</strong>`,
    icon,
    html,
    showCloseButton: true,
    showCancelButton: !!onFailure,
    showConfirmButton: !!onSuccess,
    focusConfirm: false,
    confirmButtonText: 'Ok',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed && onSuccess) {
      onSuccess();
    } else if (
      (result.dismiss === Swal.DismissReason.cancel ||
        result.dismiss === Swal.DismissReason.backdrop ||
        result.dismiss === Swal.DismissReason.close ||
        result.dismiss === Swal.DismissReason.esc) &&
      onFailure
    ) {
      onFailure();
    }
  });
};
