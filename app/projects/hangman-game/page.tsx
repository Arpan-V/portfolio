"use client";

import CodeTypewriter from "@/components/ui/CodeTypewriter";

const CODE = `import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

public class Main{

    public static void main(String[] args) {

        String filePath = "src//words.txt";

        ArrayList<String> words = new ArrayList<>();

        try(BufferedReader reader = new BufferedReader(new FileReader(filePath))){

            String line;

            while ((line = reader.readLine()) != null){

                words.add(line.trim());

            }

        }

        catch(FileNotFoundException e){

            System.out.println("File not found.");

        }

        catch(IOException e){

            System.out.println("Something went wrong.");

        }

        Random random = new Random();

        String word = words.get(random.nextInt(words.size()));

        Scanner scanner = new Scanner(System.in);

        ArrayList<Character> wordState = new ArrayList<>();

        int wrongGuess = 0;

        for (int i = 0; i < word.length(); i++){

            wordState.add('_');

        }

        System.out.println();

        System.out.println("*******************************");

        System.out.println("Welcome to Java Hangman Game!!!");

        System.out.println("*******************************");

        System.out.println();

        while(wrongGuess < 6){

            System.out.print(getHangmanArt(wrongGuess));

            System.out.print("Word: ");

            for (char c : wordState){

                System.out.print(c);

            }

            System.out.println();

            System.out.print("Guess a letter: ");

            char guess = scanner.next().toLowerCase().charAt(0);

            System.out.println();

            if (word.indexOf(guess) >= 0){

                for (int i = 0; i < word.length(); i++){

                    if (word.charAt(i) == guess){

                        wordState.set(i, guess);

                    }

                }

                if (!wordState.contains('_')){

                    System.out.println("YOU WIN!!!");

                    System.out.println("Word: " + word);

                    break;

                }

            }

            else {

                wrongGuess++;

            }

            if (wrongGuess >= 6){

                System.out.print(getHangmanArt(wrongGuess));

                System.out.println("GAME OVER!!!");

                System.out.println("Word: " + word);

            }

        }

        scanner.close();

    }

    static String getHangmanArt(int wrongGuess){

        return switch (wrongGuess){

            case 0 -> """

                      

                      

                      

                      """;

            case 1 -> """

                       o

                      

                      

                      """;

            case 2 -> """

                       o

                       |

                      

                      """;

            case 3 -> """

                       o

                      /|

                      

                      """;

            case 4 -> """

                       o

                      /|\\\\

                      

                      """;

            case 5 -> """

                       o

                      /|\\\\

                      /

                      """;

            case 6 -> """

                       o

                      /|\\\\

                      / \\\\

                      """;

            default -> "";

        };

    }

}`;

export default function HangmanPage() {
  return (
    <main className="relative min-h-screen text-[#e6e9ea]">
      {/* Static background image — fixed layer that never shifts on mobile scroll */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 h-[100lvh] w-full bg-[#0b0e0f] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/projects/lens-bg.jpg')",
          backgroundAttachment: "scroll",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 h-[100lvh] w-full bg-gradient-to-b from-[#0b0e0f]/85 via-[#0b0e0f]/70 to-[#0b0e0f]/90"
      />

      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        {/* Heading + description */}
        <header className="max-w-2xl">
          <h1 className="mt-6 text-3xl font-bold text-[#7bd0ff] tracking-tight sm:text-4xl lg:text-5xl">
            Hangman <span className="text-silver">Game</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#c3cbcd] sm:text-base">
            A classic Hangman game built in Java. It reads a list of words from a
            file, picks one at random, and lets you guess letters one at a time —
            with six wrong guesses before the game is over. Below is the full
            source code, written live.
          </p>
          <a
            href="https://github.com/arpan-v/java-hangman"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-white/12 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c3cbcd] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors hover:border-[#7bd0ff]/45 hover:bg-[#7bd0ff]/10 hover:text-[#7bd0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7bd0ff]/60 sm:text-xs"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
            </svg>
            View on GitHub
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </header>

        {/* Transparent fixed-size code panel */}
        <CodeTypewriter code={CODE} fileName="Main.java" />
      </div>
    </main>
  );
}
