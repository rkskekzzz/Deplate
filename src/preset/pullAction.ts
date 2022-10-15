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
export function pullAction(answer: Answer) {
  return {
    name: answer['pullActionName'],
    on: {
      workflow_run: {
        workflows: [answer['pushActionName']],
        types: ['completed'],
      },
    },
    jobs: {
      'on-success': {
        if: "${{ github.event.workflow_run.conclusion == 'success' }}",
        'runs-on': 'ubuntu-latest',
        'timeout-minutes': answer['timeout-minutes'],
        steps: [
          {
            name: 'Set up Access Token',
            run: 'echo "${{ secrets.LIGHTSAIL_ACCESS_KEY }}" > ./accesskey.pem',
          },
          {
            name: 'Change Access Token Permission',
            run: 'chmod 600 ./accesskey.pem',
          },
          {
            name: 'Connect to Server via SSH',
            run: 'ssh -i ./accesskey.pem -o StrictHostKeyChecking=no ubuntu@${{ secrets.LIGHTSAIL_IP }} " \\\nsudo docker pull ${{ secrets.DOCKER_USERNAME }}/${{ secrets.DOCKER_IMAGE }}:latest \\\n&& sudo docker stop backend \\\n&& sudo docker rm backend \\\n&& sudo docker run -d --name backend -p ${{ secrets.DOCKER_PORT }}:${{ secrets.DOCKER_PORT }} ${{ secrets.DOCKER_USERNAME }}/${{ secrets.DOCKER_IMAGE }}:latest \\\n&& exit"\n',
          },
        ],
      },
    },
  };
}
