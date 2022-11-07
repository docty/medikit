import { keys, length, lensPath, over, pick, prop, values, view } from 'ramda';
import { ITag } from '../types';
import { gallery, user } from './galleryData'


export const getLength = () => {

    return length(keys(gallery))
}

export const getRandomNumber = (count: number) => {


    return Math.floor(Math.random() * count);
}


export const getRandomKey = (count: number) => {

    const position = Math.floor(Math.random() * count);

    return keys(gallery)[position]
}


export const getSingleData = (id: string) => {

    const path = lensPath([id, 'src']);

    const data = pick([id], gallery);

    const predicate = (res: any) => {
        const getKeys = keys(res);

        const randomNumber = getRandomNumber(length(getKeys))

        const getKey = getKeys[randomNumber];

        const newData = pick([getKey], res);

        return newData

    }

    const compute = over(path, predicate, data)

    return compute;
}

export const getIndividualData = (id: string) => {
    const data = prop(id, gallery);
    return data;
}

/**
 * Fetches a user with a given id
 * @param id user id
 * @returns 
 */
export const getIndividualUser = (id: string) => {
    const data = prop(id, user);
    return data;
}

export const fetchByTag = (tag: ITag) => {
    const data = values(gallery)

    const response = data.map(item => {
        return values(item.src).filter(found => found.tag === tag)
    })

    return response.flat()
}    