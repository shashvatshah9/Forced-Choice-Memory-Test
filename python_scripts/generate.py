from glob import glob
from random import sample, shuffle
from shutil import copy
from os import rename, mkdir


def generate_question(answer, remaining, D):
    '''
    Generates a question given an answer
    Returns a tuple of whose 1st element contains a list of D+1 options
    and the 2nd element is the answer to the question
    Ex: (['1.png', '2.png', '3.png', '4.png'], '2.png')
    '''
    cur = list()
    cur.append(answer)

    #Number of distractors
    NUM_DISTRACTORS = D

    for i in range(NUM_DISTRACTORS):
        other = sample(remaining, 1)[0]
        remaining.remove(other)
        cur.append(other)
    shuffle(cur)
    res = (cur, answer)
    return res


def generate_set(N, D):
    '''
    Generates a complete test set:
    Returns a list of 1+N elements, 1st element contains the N question
    which is followed by N question, ansewer pairs having D distractors
    as described in generate_question() function
    '''
    images = glob('images/*.svg')
    #Number of Images in the test
    NUM_IMAGES = N

    que_set = sample(images, NUM_IMAGES)

    for ele in que_set:
        images.remove(ele)

    res = list()
    res.append(que_set)

    for ele in que_set:
        res.append(generate_question(ele, images, D))
    return res


def generate_files(test_id, N, D):
    '''
    Generates a test with a folder named ID having N question each with D+1 options
    Returns None
    '''
    base_path = '/Users/Harshad/Desktop/flags/'
    mkdir(base_path + str(test_id))
    copy(base_path + 'Training Phase.html', base_path + str(test_id))
    base_path = base_path + str(test_id)
    mkdir(base_path + '/test')

    ans = generate_set(N, D)
    for ele in ans[0]:
        copy(ele, base_path + '/test')

    shuffle(ans[0])
    for i in range(len(ans[0])):
        rename(base_path + '/test' + ans[0][i][6:], base_path + '/test/' + str(i+1) + 'a.svg')

    file = open(base_path + '/answers.txt', 'a')

    for i in range(1, len(ans)):
        mkdir(base_path + '/' + str(i))
        res = 1
        cur_path = base_path + '/' + str(i)
        for ele in ans[i][0]:
            copy(ele, cur_path)

        for j in range(len(ans[i][0])):
            if(ans[i][0][j] == ans[i][1]):
                res = j+1
            rename(cur_path + ans[i][0][j][6:], cur_path + '/' + str(j+1) + '..svg')
        file.write(str(res)+'\n')
    file.close()


for i in range(1, 21):
    generate_files(i, 20, 7)