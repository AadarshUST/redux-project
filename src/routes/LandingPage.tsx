import React from 'react';
import Header from '~/components/Header';
import Items from '~/components/LandingComponents/Items';
import { cardList } from '~/Style/LandingPage.module.css';

const LandingPage = () => {
    const menu = [
        {
            id: 1,
            title: "buttermilk pancakes",
            img: "./images/item-1.jpeg",
            desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `
        },
        {
            id: 2,
            title: "diner double",
            img: "./images/item-2.jpeg",
            desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica.`
        },
        {
            id: 3,
            title: "godzilla milkshake",
            img: "./images/item-3.jpeg",
            desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`
        },
        {
            id: 4,
            title: "country delight",
            img: "./images/item-4.jpeg",
            desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `
        },
        {
            id: 5,
            title: "egg attack",
            img: "./images/item-5.jpeg",
            desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `
        },
        {
            id: 6,
            title: "oreo dream",
            img: "./images/item-6.jpeg",
            desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`
        },
        {
            id: 7,
            title: "bacon overflow",
            img: "./images/item-7.jpeg",
            desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `
        },
        {
            id: 8,
            title: "american classic",
            img: "./images/item-8.jpeg",
            desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `
        },
        {
            id: 9,
            title: "quarantine buddy",
            img: "./images/item-9.jpeg",
            desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`
        }
    ];

    return (
        <>
            <Header />
            <div className={cardList}>
                {
                    menu.map(({ id, title, img, desc }) => {
                        return <Items key={id} title={title} src={img} desc={desc} />
                    })
                }
            </div>\
        </>
    )
}

export default LandingPage