import git
import os
import command
from subprocess import check_output
from datetime import datetime, time
from time import sleep
import requests as req

EXECUTED = False
INITIALIZED = False

while EXECUTED == False:
    g = git.cmd.Git('./advent-of-code-solutions')
    g.pull()

    repo = git.Repo("./advent-of-code-solutions")
    tree = repo.tree()
    for blob in tree:
        commit = next(repo.iter_commits(paths=blob.path, max_count=1))
        if blob.path == '2022':
            print("Found 2022")
            repo_commit_date = datetime.fromtimestamp(commit.committed_date)
            print("Latest change at ", repo_commit_date.date())
            print("Current date is ", datetime.utcnow().time())

            NOW_DATETIME = datetime.utcnow()
            if ((repo_commit_date.date() == NOW_DATETIME.date()) and
               (NOW_DATETIME.time() > time(5, 0)) and
               (repo_commit_date.time() < NOW_DATETIME.time()) and
               (repo_commit_date.time() > time(5, 0))):
                print("It's time to execute the script")
                EXECUTED = True
                break


    if EXECUTED == False:
        g = git.cmd.Git('./advent-of-code')
        g.pull()

        repo = git.Repo("./advent-of-code")
        tree = repo.tree()
        for blob in tree:
            commit = next(repo.iter_commits(paths=blob.path, max_count=1))
            if blob.path == '2022':
                print("Found 2022")
                repo_commit_date = datetime.fromtimestamp(commit.committed_date)
                print("Latest change at ", repo_commit_date.date())
                print("Current date is ", datetime.utcnow().time())

                NOW_DATETIME = datetime.utcnow()
                if ((repo_commit_date.date() == NOW_DATETIME.date()) and
                   (NOW_DATETIME.time() > time(5, 0)) and
                   (repo_commit_date.time() < NOW_DATETIME.time()) and
                   (repo_commit_date.time() > time(5, 0))):
                    print("It's time to execute the script")
                    EXECUTED = True
                    break

    if EXECUTED == False:
        g = git.cmd.Git('./advent-of-code-2')
        g.pull()

        repo = git.Repo("./advent-of-code-2")
        tree = repo.tree()
        for blob in tree:
            commit = next(repo.iter_commits(paths=blob.path, max_count=1))
            if blob.path == '2022':
                print("Found 2022")
                repo_commit_date = datetime.fromtimestamp(commit.committed_date)
                print("Latest change at ", repo_commit_date.date())
                print("Current date is ", datetime.utcnow().time())

                NOW_DATETIME = datetime.utcnow()
                if ((repo_commit_date.date() == NOW_DATETIME.date()) and
                   (NOW_DATETIME.time() > time(5, 0)) and
                   (repo_commit_date.time() < NOW_DATETIME.time()) and
                   (repo_commit_date.time() > time(5, 0))):
                    print("It's time to execute the script")
                    EXECUTED = True
                    break

    if EXECUTED == False:
        g = git.cmd.Git('./AdventOfCode')
        g.pull()

        repo = git.Repo("./AdventOfCode")
        tree = repo.tree()
        for blob in tree:
            commit = next(repo.iter_commits(paths=blob.path, max_count=1))
            if blob.path == '2022':
                print("Found 2022")
                repo_commit_date = datetime.fromtimestamp(commit.committed_date)
                print("Latest change at ", repo_commit_date.date())
                print("Current date is ", datetime.utcnow().time())

                NOW_DATETIME = datetime.utcnow()
                if ((repo_commit_date.date() == NOW_DATETIME.date()) and
                   (NOW_DATETIME.time() > time(5, 0)) and
                   (repo_commit_date.time() < NOW_DATETIME.time()) and
                   (repo_commit_date.time() > time(5, 0))):
                    print("It's time to execute the script")
                    EXECUTED = True
                    break

    if INITIALIZED:
        print("Sleeping for 10 minutes")
        sleep(60 * 10) # 10 minutes
    else:
        INITIALIZED = True



DAY = datetime.now().strftime("%d")
if (os.path.exists('./advent-of-code-solutions/2022/{}'.format(DAY))):
    print('Folder for day {} exists'.format(DAY))

    if (os.path.exists('./advent-of-code-solutions/2022/{}/part1.js'.format(DAY)) and
        os.path.exists('./advent-of-code-solutions/2022/{}/part2.js'.format(DAY)) and
        os.path.exists('./advent-of-code-solutions/2022/{}/input'.format(DAY))):
        print('Both parts exist')

        os.remove('./advent-of-code-solutions/2022/{}/input'.format(DAY))
        print('Removed input file')

        cookies = { 'session': '' }
        resp = req.get("https://adventofcode.com/2022/day/{}/input".format(DAY.lstrip("0")), cookies=cookies)

        f = open('./advent-of-code-solutions/2022/{}/input'.format(DAY), "a")
        f.write(resp.text)
        f.close()
        print('Added input file')

        cmd1_output = command.run(['./advent-of-code-solutions/2022/{}/part1.js'.format(DAY), './advent-of-code-solutions/2022/{}/input'.format(DAY)])
        print('\nAnswer for task1: ', str(cmd1_output.output))
        post1_data = {'level': 1, 'answer': cmd1_output.output.decode('utf-8')}
        print('Post1 data: ', post1_data, '\n')
        req.post("https://adventofcode.com/2022/day/{}/answer".format(DAY.lstrip("0")), data=post1_data, cookies=cookies)

        sleep(10)

        cmd2_output = command.run(['./advent-of-code-solutions/2022/{}/part2.js'.format(DAY), './advent-of-code-solutions/2022/{}/input'.format(DAY)])
        print('Answer for task2: ', str(cmd2_output.output))
        post2_data = {'level': 2, 'answer': cmd2_output.output.decode('utf-8')}
        print('Post2 data: ', post2_data, '\n')
        req.post("https://adventofcode.com/2022/day/{}/answer".format(DAY.lstrip("0")), data=post2_data, cookies=cookies)



if (os.path.exists('./advent-of-code/2022/src/{}'.format(DAY))):
    print('Folder for day {} exists'.format(DAY))

    if (os.path.exists('./advent-of-code/2022/src/{}/a.ts'.format(DAY)) and
        os.path.exists('./advent-of-code/2022/src/{}/b.ts'.format(DAY))):
        print('Both parts exist')

        if os.path.exists('./advent-of-code/2022/src/{}/in.txt'.format(DAY)):
            os.remove('./advent-of-code/2022/src/{}/in.txt'.format(DAY))
            print('Removed input file')

        cookies = { 'session': '' }
        resp = req.get("https://adventofcode.com/2022/day/{}/input".format(DAY.lstrip("0")), cookies=cookies)

        f = open('./advent-of-code/2022/src/{}/in.txt'.format(DAY), "a")
        f.write(resp.text)
        f.close()
        print('Added input file')


        p = check_output(['npx', 'ts-node', 'a.ts'], cwd='./advent-of-code/2022/src/{}'.format(DAY))
        parsed_answer = p.decode('utf-8').split('\n')[2].split().pop()
        print('\nAnswer for task1: ', str(parsed_answer))
        post1_data = {'level': 1, 'answer': parsed_answer}
        print('Post1 data: ', post1_data, '\n')
        req.post("https://adventofcode.com/2022/day/{}/answer".format(DAY.lstrip("0")), data=post1_data, cookies=cookies)

        sleep(10)

        p = check_output(['npx', 'ts-node', 'b.ts'], cwd='./advent-of-code/2022/src/{}'.format(DAY))
        parsed_answer = p.decode('utf-8').split('\n')[2].split().pop()
        print('Answer for task2: ', str(parsed_answer))
        post2_data = {'level': 2, 'answer': parsed_answer}
        print('Post2 data: ', post2_data, '\n')
        req.post("https://adventofcode.com/2022/day/{}/answer".format(DAY.lstrip("0")), data=post2_data, cookies=cookies)



if (os.path.exists('./advent-of-code-2/2022/typescript/day{}'.format(DAY))):
    print('Folder for day {} exists'.format(DAY))

    if (os.path.exists('./advent-of-code-2/2022/typescript/day{}/part1.ts'.format(DAY)) and
        os.path.exists('./advent-of-code-2/2022/typescript/day{}/part2.ts'.format(DAY))):
        print('Both parts exist')

        if os.path.exists('./advent-of-code-2/2022/typescript/inputs/day{}.txt'.format(DAY)):
            os.remove('./advent-of-code-2/2022/typescript/inputs/day{}.txt'.format(DAY))
            print('Removed input file')

        cookies = { 'session': '' }
        resp = req.get("https://adventofcode.com/2022/day/{}/input".format(DAY.lstrip("0")), cookies=cookies)

        f = open('./advent-of-code-2/2022/typescript/inputs/day{}.txt'.format(DAY), "a")
        f.write(resp.text)
        f.close()
        print('Added input file')


        p = check_output(['npm', 'run', 'day{}p1'.format(DAY)], cwd='./advent-of-code-2/2022/typescript/')
        parsed_answer = p.decode('utf-8').split('\n\n')[1].split('\n')[0]
        print('\nAnswer for task1: ', str(parsed_answer))
        post1_data = {'level': 1, 'answer': parsed_answer}
        print('Post1 data: ', post1_data, '\n')
        req.post("https://adventofcode.com/2022/day/{}/answer".format(DAY.lstrip("0")), data=post1_data, cookies=cookies)

        sleep(10)

        p = check_output(['npm', 'run', 'day{}p2'.format(DAY)], cwd='./advent-of-code-2/2022/typescript/')
        parsed_answer = p.decode('utf-8').split('\n\n')[1].split('\n')[0]
        print('Answer for task2: ', str(parsed_answer))
        post2_data = {'level': 2, 'answer': parsed_answer}
        print('Post2 data: ', post2_data, '\n')
        req.post("https://adventofcode.com/2022/day/{}/answer".format(DAY.lstrip("0")), data=post2_data, cookies=cookies)



if (os.path.exists('./AdventOfCode/2022/{}.py'.format(DAY))):
    print('File for day {} exists'.format(DAY))

    if os.path.exists('./AdventOfCode/2022/{}.in'.format(DAY)):
        os.remove('./AdventOfCode/2022/{}.in'.format(DAY))
        print('Removed input file')

    cookies = { 'session': '' }
    resp = req.get("https://adventofcode.com/2022/day/{}/input".format(DAY.lstrip("0")), cookies=cookies)

    f = open('./AdventOfCode/2022/{}.in'.format(DAY), "a")
    f.write(resp.text)
    f.close()
    print('Added input file')


    p = check_output(['python', '{}.py'.format(DAY)], cwd='./AdventOfCode/2022/')
    parsed_answer_1 = p.decode('utf-8').split('\n')[0]
    print('\nAnswer for task1: ', str(parsed_answer_1))
    post1_data = {'level': 1, 'answer': parsed_answer_1}
    print('Post1 data: ', post1_data, '\n')
    req.post("https://adventofcode.com/2022/day/{}/answer".format(DAY.lstrip("0")), data=post1_data, cookies=cookies)

    sleep(10)

    parsed_answer_2 = p.decode('utf-8').split('\n')[1]
    print('\nAnswer for task2: ', str(parsed_answer_2))
    post2_data = {'level': 2, 'answer': parsed_answer_2}
    print('Post2 data: ', post2_data, '\n')
    req.post("https://adventofcode.com/2022/day/{}/answer".format(DAY.lstrip("0")), data=post2_data, cookies=cookies)
