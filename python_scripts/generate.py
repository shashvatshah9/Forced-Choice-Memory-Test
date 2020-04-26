from glob import glob
from random import sample, shuffle
from shutil import copy
import os
from os import rename, mkdir, makedirs


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
    base_path = os.path.abspath(os.path.join('..', 'Flags'))
    images = glob(base_path + '/*.svg')
    print('Number of images in Flags folder {0}'.format(len(images)))
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
    base_path = os.path.abspath('..')
    makedirs(os.path.join(base_path, 'questions', str(test_id), 'test'))
    base_path = os.path.join(base_path, 'questions', str(test_id))

    ans = generate_set(N, D)
    for ele in ans[0]:
        copy(ele, os.path.join(base_path, 'test'))

    shuffle(ans[0])

    test_images = glob(base_path + '/test' + '/*.svg')
    test_count = 1
    for x in test_images:
        rename(x, os.path.join(base_path, 'test', str(test_count) + 'a.svg'))
        test_count = test_count + 1

    file = open(base_path + '/answers.txt', 'a')

    for i in range(1, len(ans)):
        mkdir(os.path.join(base_path, str(i)))
        res = 1
        cur_path = os.path.join(base_path, str(i))
        for ele in ans[i][0]:
            copy(ele, cur_path)

        test_questions = glob(cur_path + '/*.svg')
        print('number of svg file in one question {0}'.format(len(test_questions)))
        answer_name = ans[i][1].split('/')[-1]
        j=0
        for ques in test_questions:
            if(ques.split('/')[-1] == answer_name):
                res = j+1
            print('{0} {1}'.format(ques, os.path.join(cur_path, str(j+1)+'.svg')))
            rename(ques, os.path.join(cur_path, str(j+1) + '.svg'))
            j = j+1
        file.write(str(res)+'\n')
    file.close()


for i in range(1, 21):
    generate_files(i, 20, 7)
