import api, {endpoints} from './index'

export async function getGames(page, search, platforms) {
    const { get } = await api
    return get(endpoints.games(page, search, platforms)) 
}