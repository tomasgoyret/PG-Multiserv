import { useSelector } from "react-redux";


export const Review = () => {
    const { reviews, usuarios } = useSelector(state => state)

    const reviewsdata = reviews.map(review => ({
        title: review.title,
        details: review.details,
        rating: review.rating,
        user: usuarios.filter(usuario => usuario.uidClient === review.usuarioUidClient)
    }));

    const rating = reviewsdata.map(rating => rating.rating);
    const total = rating.reduce((a, b) => a + b, 0);
    const promedio = total / rating.length;


    const titleEstrellas = ["1 Estrella", "2 Estrellas", "3 Estrellas", "4 Estrellas", "5 Estrellas"]



    const unaEstrella = rating.filter(r => r === 1)
    const dosEstrella = rating.filter(r => r === 2)
    const tresEstrella = rating.filter(r => r === 3)
    const cuatroEstrella = rating.filter(r => r === 4)
    const cincoEstrella = rating.filter(r => r === 5)

    const estrellas = {
        unaEstrella: unaEstrella.length,
        dosEstrella: dosEstrella.length,
        tresEstrella: tresEstrella.length,
        cuatroEstrella: cuatroEstrella.length,
        cincoEstrella: cincoEstrella.length

    }
    const estrellasData = Object.values(estrellas)
    const porcentaje = estrellasData.map(p => ((p / rating.length) * 100))
    let title = titleEstrellas.values();



    return {
        promedio,
        rating,
        reviewsdata,
        total,
        porcentaje,
        title
    }
};
