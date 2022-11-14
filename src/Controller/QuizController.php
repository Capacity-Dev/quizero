<?php

namespace App\Controller;

use App\Entity\Quiz;
use App\Repository\QuizRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class QuizController extends AbstractController
{
    #[Route('/api/quiz', name: 'app_quiz',methods:['GET'])]
    public function index(QuizRepository $quiz, SerializerInterface $serializer): JsonResponse
    {
        $data=$quiz->findAll();
        $data=$serializer->serialize($data,'json',['groups'=>'getQuiz']);
        return $this->json($data);
    }
    #[Route('/api/quiz', name:'quiz.create',methods:['POST'])]
    public function createQuiz(Request $req,SerializerInterface $serializer,EntityManagerInterface $em, UserRepository $users) : JsonResponse
    {
        $quiz=new Quiz();
        $content=$req->toArray();
        $content['true_answer']=(int) $content['true_answer'];
        var_dump(\json_encode($content));
        $newquiz=$serializer->deserialize(\json_encode($content),Quiz::class,'json',[AbstractNormalizer::OBJECT_TO_POPULATE=>$quiz]);
        $userID=(int) 2;
        $user=$users->find($userID);
        $quiz->setUser($user);
        $em->persist($newquiz);
        $em->flush();

        return $this->json(array(
            'message'=>'le quiz a été crée'
        ),JsonResponse::HTTP_CREATED);
        
    }
    #[Route('/api/quiz/{id}', name:'quiz.one', methods:['GET'])]
    public function getOneQuiz(Quiz $quiz,SerializerInterface $serializer){
        $data=$serializer->serialize($quiz,'json',['groups'=>'getQuiz']);
        return new JsonResponse($data,JsonResponse::HTTP_OK,[],true);
    }
    #[Route('/api/quiz/{id}', name:'quiz.delete', methods:['DELETE'])]
    public function deleteQuiz(Quiz $quiz,EntityManagerInterface $em) : JsonResponse
    {
        $em->remove($quiz);
        $em->flush();
        return $this->json([
            "message"=>"quiz supprimé"
        ],JsonResponse::HTTP_NO_CONTENT);
    }
    #[Route('/api/quiz/{id}', name:'quiz.update', methods:['PUT'])]
    public function update(Quiz $quiz,Request $req,SerializerInterface $serializer,EntityManagerInterface $em, UserRepository $users, ValidatorInterface $validator){
        
        $newquiz=$serializer->deserialize($req->getContent(),Quiz::class,'json',[AbstractNormalizer::OBJECT_TO_POPULATE=>$quiz]);
        $content=$req->toArray();
        $userID=(int) 2;
        $user=$users->find($userID);
        $quiz->setUser($user);
        $errors=$validator->validate($quiz);
        if($errors->count() > 0){
            return new JsonResponse($serializer->serialize($errors, 'json'), JsonResponse::HTTP_BAD_REQUEST, [], true);
        }
        $em->persist($newquiz);
        $em->flush();    
        return $this->json(array(
            'message'=>'le quiz a été mis à jour'
        ),JsonResponse::HTTP_NO_CONTENT);
    }
}
