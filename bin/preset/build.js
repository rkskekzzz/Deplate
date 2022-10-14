/**
 * This file is preset for the workflow.
 *
 * some values will be replace by user input.
 * following values will be replaced.
 * - fileName
 * - build.strategy
 * - build.steps
 */
const dockerStep = [
    {
        name: 'Set up Docker Buildx',
        id: 'buildx',
        uses: 'docker/setup-buildx-action@v1',
    },
    {
        name: 'Log in to Docker Hub',
        uses: 'docker/login-action@f054a8b539a109f9f41c372932f1ae047eff08c9',
        with: {
            username: '${{ secrets.DOCKER_USERNAME }}',
            password: '${{ secrets.DOCKER_TOKEN }}',
        },
    },
    {
        name: 'Extract metadata (tags, labels) for Docker',
        id: 'meta',
        uses: 'docker/metadata-action@v2',
        with: {
            images: '${{ secrets.DOCKER_USERNAME }}/${{ secrets.DOCKER_IMAGE }}',
        },
    },
    {
        name: 'Build and push Docker image',
        uses: 'docker/build-push-action@v3',
        with: {
            push: true,
            tags: '${{ secrets.DOCKER_USERNAME }}/${{ secrets.DOCKER_IMAGE }}:latest',
        },
    },
];
export const buildyaml = {
    // will be replaced with your file name
    name: 'Build And Push Docker Image',
    on: {
        push: {
            branches: ['main'],
        },
    },
    jobs: {
        build: {
            'runs-on': 'ubuntu-latest',
            strategy: {
                'max-parallel': 4,
                matrix: {
                    'python-version': [3.7, 3.8, 3.9],
                },
            },
            steps: [
                {
                    uses: 'actions/checkout@v3',
                },
                {
                    name: 'Set up Python ${{ matrix.python-version }}',
                    uses: 'actions/setup-python@v3',
                    with: {
                        'python-version': '${{ matrix.python-version }}',
                    },
                },
                {
                    name: 'Install Dependencies',
                    run: 'python -m pip install --upgrade pip\npython -m pip install Django\n',
                },
                {
                    name: 'Run Tests',
                    run: 'python manage.py test\n',
                },
                ...dockerStep,
            ],
        },
    },
};
