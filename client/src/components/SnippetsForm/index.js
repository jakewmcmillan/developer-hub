import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import  {ADD_SNIPPET} from '../../utils/mutations';
import {QUERY_SNIPPETS } from '../../utils/queries';