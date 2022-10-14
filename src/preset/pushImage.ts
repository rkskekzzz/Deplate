import { Answer } from '../questions.js';

/**
 * This file is preset for the workflow.
 *
 * some values will be replace by user input.
 * following values will be replaced.
 * - fileName
 * - on state
 * - build strategy
 */
export function pushImagePreset(answer: Answer) {
  return {
    // will be replaced with your file name
    name: answer['fileName'],
    on: {
      push: {
        branches: ['main'],
      },
    },
    jobs: {
      build: {
        'runs-on': 'ubuntu-latest',
        'timeout-minutes': answer['timeout-minutes'],
        steps: [
          {
            name: 'Set up Docker Buildx',
            id: 'buildx',
            uses: 'docker/setup-buildx-action@v1',
          },
          {
            name: 'Log in to Docker Hub',
            uses: 'docker/login-action@v2',
            with: {
              username: '${{ secrets.DOCKER_USERNAME }}',
              password: '${{ secrets.DOCKER_TOKEN }}',
            },
          },
          {
            name: 'Build and push Docker image',
            uses: 'docker/build-push-action@v3',
            with: {
              context: '.',
              push: true,
              tags: '${{ secrets.DOCKER_USERNAME }}/${{ secrets.DOCKER_IMAGE }}:latest',
            },
          },
        ],
      },
    },
  };
}
