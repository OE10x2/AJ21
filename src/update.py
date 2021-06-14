from jikanpy import Jikan
import json, time

def update():
    jikan = Jikan()

    ez = jikan.user(username='OE10x2', request='animelist')
    raw_animes = ez['anime']

    animes = []
    for i, anime in enumerate(raw_animes):
        tmp = jikan.anime(anime['mal_id'])
        lst = {}
        lst['id'] = anime['mal_id']
        lst['score'] = tmp['score']
        lst['scored_by'] = tmp['scored_by']
        lst['rank'] = tmp['rank']
        animes.append(lst)
        time.sleep(4)
        print (f"""{i+1} out of {len(raw_animes)} done""")

    with open("animes.json", "w") as file:
        json.dump(animes, file)