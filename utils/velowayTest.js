const API_KEY = 'bt795vacnnbgj94q1yt9thnld136vn0kx8es8yam';
const telefono = '+54221456321';
const crearEnvio = async () => {
    const token = 'Bearer ' + API_KEY;
    try {
        const response = await fetch(`https://veloway-backend-dahf.onrender.com/api/fichasMedicas/compartida/telefono/${telefono}`, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

crearEnvio();
