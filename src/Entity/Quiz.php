<?php

namespace App\Entity;

use App\Repository\QuizRepository;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: QuizRepository::class)]
class Quiz
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getQuiz"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getQuiz"])]
    #[Assert\NotBlank(message:"la question ne doit pas etre vide")]
    private ?string $question = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getQuiz"])]
    #[Assert\NotBlank(message:"ce champ ne doit pas etre vide")]
    private ?string $first_answer = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getQuiz"])]
    #[Assert\NotBlank(message:"ce champ ne doit pas etre vide")]
    private ?string $second_answer = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getQuiz"])]
    #[Assert\NotBlank(message:"ce champ ne doit pas etre vide")]
    private ?string $third_answer = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(["getQuiz"])]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column]
    #[Groups(["getQuiz"])]
    #[Assert\NotBlank(message:"ce champ ne doit pas etre vide")]
    private ?int $true_answer = null;

    #[ORM\ManyToOne(inversedBy: 'relation')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function __construct()
    {
        $this->setCreatedAt(new DateTime());
    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(string $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getFirstAnswer(): ?string
    {
        return $this->first_answer;
    }

    public function setFirstAnswer(string $first_answer): self
    {
        $this->first_answer = $first_answer;

        return $this;
    }

    public function getSecondAnswer(): ?string
    {
        return $this->second_answer;
    }

    public function setSecondAnswer(string $second_answer): self
    {
        $this->second_answer = $second_answer;

        return $this;
    }

    public function getThirdAnswer(): ?string
    {
        return $this->third_answer;
    }

    public function setThirdAnswer(string $third_answer): self
    {
        $this->third_answer = $third_answer;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getTrueAnswer(): ?int
    {
        return $this->true_answer;
    }

    public function setTrueAnswer(int $true_answer): self
    {
        $this->true_answer = $true_answer;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

}
