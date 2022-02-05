/*
const{
    TourStyle
}= require('../models');
const {
    Op
} = require("sequelize");

module.exports = {
    findByTourStyle: async (tour_style) => {
        try {
            const tourStyles = await TourStyle.findByTourStyle(tour_style);
            console.log(tourStyles);
            return tourStyles;
        } catch (err) {
            throw err;
        }
    }
}
*/
