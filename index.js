const array = [
    'Москва',
    'Санкт-Петербург',
    'Адыгея',
    'Алтайский край',
    'Архангельская область',
    'Астраханская область',
    'Башкортостан',
    'Белгородская область',
    'Брянская область',
    'Бурятия',
    'Владимирская область',
    'Волгоградская область',
    'Вологодская область',
    'Воронежская область',
    'Дагестан',
    'Забайкальский край',
    'Ивановская область',
    'Иркутская область',
    'Калининградская область',
    'Калужская область',
    'Карелия',
    'Кемеровская область',
    'Кировская область',
    'Костромская область',
    'Краснодарский край',
    'Красноярский край',
    'Крым',
    'Курганская область',
    'Курская область',
    'Ленинградская область',
    'Липецкая область',
    'Марий Эл',
    'Мордовия',
    'Москва и МО',
    'Мурманская область',
    'Нижегородская область',
    'Новгородская область',
    'Новосибирская область',
    'Омская область',
    'Оренбургская область',
    'Орловская область',
    'Пензенская область',
    'Пермский край',
    'Приморский край',
    'Псковская область',
    'Ростовская область',
    'Рязанская область',
    'Самарская область',
    'Саратовская область',
    'Свердловская область',
    'Смоленская область',
    'Ставропольский край',
    'Тамбовская область',
    'Татарстан',
    'Тверская область',
    'Томская область',
    'Тульская область',
    'Тюменская область',
    'Удмуртия',
    'Ульяновская область',
    'Хабаровский край',
    'Ханты-Мансийский АО-Югра',
    'Челябинская область',
    'Чувашия',
    'Ярославская область ',
];
const container = document.getElementsByClassName('search__selection')[0];

for (let i = 0; i < array.length; i++) {
    container.insertAdjacentHTML('beforeend', `<a href="#${i}" class="search__item"><img src="/" class="search__image" alt="${i}"><span class="search__title">${array[i]}</span></a>`);
}

new Search({
    path: '/',
    searchSelector: '.search__input',
    itemSelector: '.search__item',
    parentSelector: '.search__selection',
    itemPattern: '<a href="#{href}" class="search__item"><img src="{src}" class="search__image" alt="{alt}"><span class="search__title">{title}</span></a>',
    sortFieldName: 'title',
    initialData: () => {
        const data = [];
        const parent = document.getElementsByClassName('search__selection')[0];

        if (!parent) {
            return;
        }

        const regions = parent.getElementsByClassName('search__item');

        if (!regions.length) {
            return;
        }

        for (let region of regions) {
            const image = region.getElementsByClassName('search__image')[0];
            const title = region.getElementsByClassName('search__title')[0].textContent;

            data.push({
                alt: image.getAttribute('alt'),
                src: image.getAttribute('src'),
                href: region.getAttribute('href'),
                title: title,
            });
        }

        return data;
    },
});